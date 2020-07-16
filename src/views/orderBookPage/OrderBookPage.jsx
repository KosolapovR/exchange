import React, {useEffect} from 'react';
import TradeTable from "../../components/TradeTable";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {fetchOrderBook, wsConnectAC} from "../../state/orderBook";
import {connect} from "react-redux";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    title: {
        paddingBottom: 40,
        textAlign: 'center',
        fontSize: 20,
        color: '#F0B90B',
        fontWeight: 600,
        letterSpacing: '8px'
    },
    table: {
        padding: 10,
        ['@media (max-width:600px)']: {
            padding: 2,
        }
    },
});

function OrderBookPage(props) {
    const {connect, bids, asks, currentSymbol, pricePrecision, totalPrecision, limitAmount} = props;

    const classes = useStyles();

    useEffect(() => {
        connect(currentSymbol);
    }, [currentSymbol]);

    return (
        <div>
            <Box className={classes.title}>ORDERS</Box>
            <Grid container justify={"center"}>
                <Grid className={classes.table} item xs={6} md={5}>
                    {bids &&
                    <TradeTable
                        data={bids}
                        pricePrecision={pricePrecision}
                        totalPrecision={totalPrecision}
                        type={'bids'}
                        limitAmount={limitAmount}
                    />}
                </Grid>
                <Grid className={classes.table} item xs={6} md={5}>
                    {asks &&
                    <TradeTable
                        data={asks}
                        pricePrecision={pricePrecision}
                        totalPrecision={totalPrecision}
                        type={'asks'}
                        limitAmount={limitAmount}
                    />}
                </Grid>
            </Grid>
        </div>
    );
}

const mapStateToProps = state => ({
    bids: state.orderBookReducer.orderBook.bids,
    asks: state.orderBookReducer.orderBook.asks,
    currentSymbol: state.orderBookReducer.symbol,
    pricePrecision: state.orderBookReducer.pricePrecision,
    totalPrecision: state.orderBookReducer.totalPrecision,
    limitAmount: state.orderBookReducer.limitAmount,
});

const mapDispatchToProps = dispatch => ({
    connect: (symbol) => {
        dispatch(fetchOrderBook(symbol));
        dispatch(wsConnectAC(symbol));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookPage);
