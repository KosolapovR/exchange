import React, {useEffect} from 'react';
import TradeTable from "../../components/TradeTable";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {fetchOrderBook, wsConnectAC} from "../../state/orderBook";
import {connect} from "react-redux";

const useStyles = makeStyles({
    table: {
        margin: 10
    },
});
function OrderBookPage({connect, bids, asks}) {
    const classes = useStyles();

    const SYMBOLS = {
        BTCUSDT: 'btcusdt',
        BNBBTC: 'bnbbtc',
        ETHBTC: 'ethbtc',
    };

    useEffect(() => {
        connect(SYMBOLS.BTCUSDT);
    }, []);

    return (
        <div>
            <Grid container justify={"center"}>
                <Grid className={classes.table} item xs={12} sm={5}>
                    {bids && <TradeTable data={bids}/>}
                </Grid>
                <Grid className={classes.table} item xs={12} sm={5}>
                    {asks && <TradeTable data={asks}/>}
                </Grid>
            </Grid>
        </div>
    );
}

const mapStateToProps = state => ({
   bids: state.orderBookReducer.orderBook.bids,
   asks: state.orderBookReducer.orderBook.asks,
});

const mapDispatchToProps = dispatch => ({
    connect: (symbol) => {
        dispatch(fetchOrderBook(symbol));
        // dispatch(wsConnectAC(symbol));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookPage);
