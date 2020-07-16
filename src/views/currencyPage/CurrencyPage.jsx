import React, {useEffect} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";
import {fetchOrderBook, setSymbolAC, wsConnectAC} from "../../state/orderBook";
import Grid from "@material-ui/core/Grid";
import TradeTable from "../../components/TradeTable";


const useStyles = makeStyles((theme) => ({
    table: {
        padding: 10,
        height: 'calc(100vh - 300px)',
        ['@media (max-width:600px)']: {
            padding: 2,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function CurrencyPage(props) {
    const {currentSymbol, setSymbol, diffs, connect, pricePrecision, totalPrecision, limitAmount} = props;
    const SYMBOLS = {
        BTCUSDT: 'btcusdt',
        BNBBTC: 'bnbbtc',
        ETHBTC: 'ethbtc',
    };

    const classes = useStyles();

    useEffect(() => {
        connect(currentSymbol);
    }, [currentSymbol]);

    const handleChange = (event) => {
        setSymbol(event.target.value);
    };

    return (
        <div>
            <Grid container justify={"center"}>
                <Grid item>
                    <FormControl color='primary' variant="filled" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">Symbol</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={currentSymbol}
                            onChange={handleChange}
                        >
                            <MenuItem selected value={SYMBOLS.BTCUSDT}>BTCUSDT</MenuItem>
                            <MenuItem value={SYMBOLS.BNBBTC}>BNBBTC</MenuItem>
                            <MenuItem value={SYMBOLS.ETHBTC}>ETHBTC</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <div>
                <Grid container justify={"center"}>
                    <Grid className={classes.table} item xs={6} md={5}>
                        {diffs &&
                        <TradeTable
                            data={diffs.bids}
                            type={'bids'}
                            pricePrecision={pricePrecision}
                            totalPrecision={totalPrecision}
                            limitAmount={limitAmount}
                        />}
                    </Grid>
                    <Grid className={classes.table} item xs={6} md={5}>
                        {diffs &&
                        <TradeTable
                            data={diffs.asks}
                            type={'asks'}
                            pricePrecision={pricePrecision}
                            totalPrecision={totalPrecision}
                            limitAmount={limitAmount}
                        />}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    currentSymbol: state.orderBookReducer.symbol,
    bids: state.orderBookReducer.orderBook.bids,
    asks: state.orderBookReducer.orderBook.asks,
    diffs: state.orderBookReducer.lastDiffs,
    pricePrecision: state.orderBookReducer.pricePrecision,
    totalPrecision: state.orderBookReducer.totalPrecision,
    limitAmount: state.orderBookReducer.limitAmount,
});

const mapDispatchToProps = dispatch => ({
    setSymbol: (symbol) => {
        dispatch(setSymbolAC(symbol));
    },
    connect: (symbol) => {
        dispatch(fetchOrderBook(symbol));
        dispatch(wsConnectAC(symbol));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPage);
