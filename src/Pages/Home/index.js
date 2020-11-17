import React from "react"
import { Input, Button, TextField, makeStyles } from "@material-ui/core";
import Axios from "axios";
import { URL } from "../../constants";
import { Autocomplete } from "@material-ui/lab";

const CLIENTS = [
    'Standard Chartered Bank',
    'DBS',
    'OCBC'
]

const useStyles = makeStyles((theme) => ({
    label: {
        justifyContent: 'left',
        '& .MuiButton-endIcon': {
            right: '8px',
            position: 'absolute',
        },
    },
    root: {
        '& .MuiInputBase-root.MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: '2px solid #3f51b5',
        },
    },
    underline: {
        width: '100%',
        '&.MuiInputBase-root.MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: '2px solid #3f51b5',
        },
    }
}))

export default function Home() {
    const classes = useStyles();

    const handleUpload = () => {
        const formData = new FormData(document.querySelector('form'))
        let formParams = {}
        let fileData = new FormData()
        for (var pair of formData.entries()) {
            formParams[pair[0]] = pair[1]
        }
        if (formParams.account !== '' && formParams.attention !== '' &&
            formParams.costCentre !== '' && formParams.file.name !== '' &&
            formParams.PONum !== '' && formParams.clients) {
            fileData.append('file', formParams.file, formParams.file.name)
            fileData.append('attention', formParams['attention'])
            fileData.append('PONum', formParams['PONum'])
            fileData.append('projName', formParams['projName'])
            fileData.append('costCentre', formParams['costCentre'])
            fileData.append('account', formParams['account'])
            fileData.append('clients', formParams['clients'])
            let config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                },
                responseType: 'blob',
            };
            Axios.put(`${URL.API}/emp`, fileData, config)
                    .then(res => {
                        createPDF(res.data, "unison")
                        // console.log('@ res')
                    })
                    .catch(e => {
                        // debugger
                        console.log({e})
                    })
        }
    };

    return (
        <div className="mt-8 mx-auto max-w-md border-solid border-gray-600 border-2 p-4 rounded-lg">
            <p className="text-center mt-2 text-2xl">Welcome to Unison!!!</p>
            <div className="mt-4 mx-auto max-w-sm">
                <form onSubmit={handleUpload}>
                    <TextField
                        type="text"
                        label="Attention"
                        name="attention"
                        className={classes.root}
                        required
                        fullWidth
                    />
                    <div className="mt-2">
                        <TextField
                            type="text"
                            label="PO Number"
                            name="PONum"
                            className={classes.root}
                            required
                            fullWidth
                        />
                    </div>
                    <div className="mt-2">
                        <TextField
                            type="text"
                            label="Project Name"
                            name="projName"
                            className={classes.root}
                            fullWidth
                        />
                    </div>
                    <div className="mt-2">
                        <TextField
                            type="text"
                            label="Account"
                            name="account"
                            fullWidth
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <TextField
                            type="text"
                            label="Cost Centre"
                            name="costCentre"
                            className={classes.root}
                            fullWidth
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Autocomplete
                            options={CLIENTS}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => <TextField {...params} label="Clients" name="clients" variant="outlined" />}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Input
                            type="file"
                            name="file"
                            inputProps={{ accept: ".xls, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }}
                            className={classes.underline}
                            required
                        />
                    </div>
                </form>
                <div className="mt-4 mx-24 max-w-xs">
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleUpload}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )

    function createPDF(data, fileName) {
        const ele = document.createElement('a')
        ele.href = window.URL.createObjectURL(new Blob([data]))
        ele.setAttribute('download', `${fileName}.pdf`)
        document.body.appendChild(ele)
        ele.dispatchEvent(new MouseEvent('click'))
    }
}