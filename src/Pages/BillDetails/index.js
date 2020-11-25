import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Axios from "axios"
import * as React from "react"
import { BILL_STATUS, URL } from "../../constants"
import HomeIcon from '@material-ui/icons/Home';
import ShowIcon from "../../utilities/ShowIcon";

const useStyles = makeStyles({
    page: {
        maxWidth: 1280,
        margin: 'auto',
        padding: '16px 0 16px 0',
    },
    container: {
        margin: '16px 0',
    },
    table: {
        minWidth: 650,
    },
    root: {
        padding: '8px 0 8px 0',
        width: '48px',
    },
    tablecell: {
        '&.MuiTableCell-root': {
            padding: '8px 0 8px 0',
            width: '32px',
        }
    },
    homeicon: {
        display: 'flex',
        position: 'absolute',
        right: 0,
        paddingRight: '32px',
    },
});

function BillDetails() {
    const classes = useStyles();
    const [bills, setBills] = React.useState([]);
    const [modified, setModified] = React.useState([]);

    React.useEffect(() => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        };
        Axios.get(`${URL.API}/bills`, config)
            .then(res => {
                setBills(res.data)
            })
    }, [])

    const handleStatusChange = (index) => (e, newVal) => {
        e.stopPropagation();
        e.preventDefault();
        bills[index].invoice_status = newVal;
        setBills([...bills]);
        modified.push(index);
    }

    const handleSave = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        };
        const body = {
            invoices: modified.map(index => bills[index]),
        };
        Axios.post(`${URL.API}/billstatus`, body, config)
            .then(res => {
                alert("BILL STATUSES UPDATED");
                setModified([]);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={classes.page}>
            <ShowIcon renderIcon={<HomeIcon color="primary" />} hist={"/"} />
            <Typography>All Generated Bills</Typography>
            <TableContainer component={Paper} className={classes.container}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tablecell}>Number</TableCell>
                            <TableCell className={classes.root}>Amount</TableCell>
                            <TableCell className={classes.root}>GST</TableCell>
                            <TableCell className={classes.root}>Total</TableCell>
                            <TableCell className={classes.root}>Date</TableCell>
                            <TableCell className={classes.root}>Due Date</TableCell>
                            <TableCell className={classes.root}>Client</TableCell>
                            <TableCell className={classes.root}>Cost Centre</TableCell>
                            <TableCell className={classes.root}>Resource</TableCell>
                            <TableCell className={classes.root}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            bills.map((bill, index) => (
                                <TableRow key={bill.invoice_num}>
                                    <TableCell className={classes.tablecell}>{bill.invoice_num}</TableCell>
                                    <TableCell className={classes.root}>{bill.invoice_amt}</TableCell>
                                    <TableCell className={classes.root}>{bill.invoice_gst}</TableCell>
                                    <TableCell className={classes.root}>{bill.invoice_total}</TableCell>
                                    <TableCell className={classes.root}>{bill.invoice_date}</TableCell>
                                    <TableCell className={classes.root}>{bill.invoice_duedate}</TableCell>
                                    <TableCell className={classes.root}>{bill.client_name}</TableCell>
                                    <TableCell className={classes.root}>{bill.cost_centre}</TableCell>
                                    <TableCell className={classes.root}>{bill.resource}</TableCell>
                                    <TableCell className={classes.root}>
                                        <Autocomplete
                                            options={BILL_STATUS}
                                            getOptionLabel={(option) => option}
                                            value={bill.invoice_status}
                                            renderInput={(params) => <TextField {...params} name="bills" variant="outlined" />}
                                            onChange={handleStatusChange(index)}
                                            required
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                color="primary"
                variant="contained"
                onClick={handleSave}
                disabled={modified.length===0}
            >
                SAVE
            </Button>
        </div>
    )
}

export default BillDetails