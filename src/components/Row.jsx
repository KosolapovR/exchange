import React, {memo} from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles({
    row: {
        width: 'calc(100% - 12px)',
        height: 15
    },
    cell: {
        border: 0,
        fontSize: 12,
        fontWeight: 600,
        padding: '3px 15px',
        color: '#E6E8EA',
        ['@media (max-width:600px)']: {
            padding: '3px 5px',
        }
    },
    progress: {
        position: 'absolute',
        top: -6,
        right: props => props.right,
        left: props => props.left,
        height: 23,
        background: props => props.background,
    }
});

const Row = memo(function Row(props){
    const {data, maxWidth, type, pricePrecision, totalPrecision, limitAmount} = props;

    const styleProps = {};

    if (type === 'bids') {
        styleProps.background = 'rgba(0, 200, 0, 0.15)';
        styleProps.right = 0;
        styleProps.left = 'auto';
    } else {
        styleProps.background = 'rgba(127,0,17,0.2)';
        styleProps.right = 'auto';
        styleProps.left = 0;
    }

    const classes = useStyles(styleProps);

    let width = data[1] < limitAmount ? `${Math.floor(data[1] * maxWidth / limitAmount)}px` : `${maxWidth}px`;

    return (
        <TableRow className={classes.data}>
            <TableCell align="left" className={classes.cell}>
                {type === 'asks' ? <div style={{position: 'relative'}}>
                    {data[1].toFixed(6)}
                    <span className={classes.progress} style={{width: width}}></span>
                </div> : data[1].toFixed(6)}
            </TableCell>
            <TableCell align="center" className={classes.cell}>{data[0].toFixed(pricePrecision)}</TableCell>
            <Hidden xsDown>
                <TableCell align="right" className={classes.cell}>
                {type === 'bids' ? <div style={{position: 'relative'}}>
                    {(data[1] * data[0]).toFixed(totalPrecision)}
                    <span className={classes.progress} style={{width: width}}></span>
                </div> : (data[1] * data[0]).toFixed(totalPrecision)
                }
            </TableCell>
            </Hidden>
        </TableRow>
    )
});

export default Row;
