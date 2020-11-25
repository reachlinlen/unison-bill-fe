import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    icon: {
        display: 'flex',
        position: 'absolute',
        right: 0,
        marginRight: '32px',
    },
});

function ShowIcon(props) {
    const classes = useStyles();
    let history = useHistory();
    const handleIconClick = () => {
        console.log(props)
        history.push(props.hist);
    }
    return (
        <div className={classes.icon} onClick={handleIconClick}>
            {props.renderIcon}
        </div>
    )
}

export default ShowIcon;