import {
    fetchOrderBookAC
} from "./actions";
import axios from "axios";

const fetchOrderBook = symbol => {

    return dispatch => {
        axios
            .get(`https://www.binance.com/api/v1/depth?symbol=${symbol.toUpperCase()}&limit=100`)
            .then(response => {
                const data = response.data;

                const bids = new Map();
                const asks = new Map();

                data.bids = data.bids.map(b => [parseFloat(b[0]), parseFloat(b[1])]);
                data.bids = data.bids.filter(b => b[1] !== 0);
                data.bids.forEach(b => {
                    bids.set(b[0], b[1]);
                });

                data.asks = data.asks.map(b => [parseFloat(b[0]), parseFloat(b[1])]);
                data.asks = data.asks.filter(b => b[1] !== 0);
                data.asks.forEach(b => {
                    asks.set(b[0], b[1]);
                });

                dispatch(fetchOrderBookAC({orderBook: {bids, asks}}));
            })
    }
};

export {fetchOrderBook}
