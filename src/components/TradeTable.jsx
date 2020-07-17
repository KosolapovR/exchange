import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from "./Row";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    container: {
        background: 'rgb(30, 33, 38)',
    },
    header: {
        paddingRight: props => props.padding,
    },
    body: {
        paddingRight: props => props.padding,
        overflow: 'hidden',
        height: 'calc(100vh - 246px)',
        '&:hover': {
            paddingRight: 0,
            overflowY: 'auto',
        },
        ['@media (max-width:600px)']: {
            fontSize: 9,
            overflowX: 'hidden',
            overflowY: 'hidden',
        },
        ['@media (max-width:340px)']: {
            fontSize: 7,
            overflowX: 'hidden',
            overflowY: 'hidden',
        }
    },
    table: {
        minWidth: 150,
    },
    header__cell: {
        color: 'rgb(146, 154, 165)',
        border: 0,
        fontSize: 12,
        fontWeight: 600,
        padding: '5px 15px 10px',
        ['@media (max-width:600px)']: {
            padding: '4px 7px 8px',
        }
    },
    tableBody: {
        maxHeight: "100px",
    },
    loaderContainer: {
        height: 'calc(100vh - 300px)',
    }
});


export default function TradeTable(props) {
    const {data, type, pricePrecision, totalPrecision, limitAmount} = props;

    const [maxWidth, setMaxWidth] = useState(0);

    const table = useRef();

    const styleProps = {padding: 12};
    const classes = useStyles(styleProps);

    useEffect(() => {
        //вычисление ширины таблицы для корректного отображения progress-bar
        setMaxWidth(table.current.offsetWidth);
    }, []);

    let rows;
    if (data) {
        rows = [...data.entries()].map(
            (dataRow, i) => {
                return (
                    <Row
                        key={i}
                        type={type}
                        maxWidth={maxWidth}
                        data={dataRow}
                        pricePrecision={pricePrecision}
                        totalPrecision={totalPrecision}
                        limitAmount={limitAmount}
                    />
                )
            });
    }

    return (
        <TableContainer component={Paper} className={classes.container}>
            <div className={classes.header}>
                <Table aria-label="simple table" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" className={classes.header__cell}>Amount</TableCell>
                            <TableCell align="center" className={classes.header__cell}>Price</TableCell>
                            <Hidden xsDown>
                                <TableCell align="right" className={classes.header__cell}>Total</TableCell>
                            </Hidden>
                        </TableRow>
                    </TableHead>
                </Table>
            </div>
            <div className={classes.body} id={'table'} ref={table}>
                <Table className={classes.table} style={{tableLayout: 'fixed'}}>
                    <TableBody className={classes.tableBody}>
                        {
                            (data && data.size) ?
                                rows :
                                <Grid
                                    className={classes.loaderContainer}
                                    container
                                    justify='center'
                                    alignContent='center'>
                                    <Grid item>
                                        <CircularProgress/>
                                    </Grid>
                                </Grid>
                        }
                    </TableBody>
                </Table>
            </div>
        </TableContainer>
    );
}
