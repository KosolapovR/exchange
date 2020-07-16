import {FETCH_ORDER_BOOK, SET_DIFFS, SET_SYMBOL, UPDATE_ASKS, UPDATE_BIDS, WS_CONNECTED} from "./types";

const initialState = {
    connected: false,
    orderBook: {bids: null, asks: null},
    symbol: 'btcusdt',
    pricePrecision: 4,
    totalPrecision: 2,
    limitAmount: 2,
    lastDiffs: {bids: null, asks: null},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_CONNECTED:
            return {
                ...state,
                orderBook: {bids: new Map(), asks: new Map()},
                lastDiffs: {bids: new Map(), asks: new Map()},
                connected: true
            };
        case FETCH_ORDER_BOOK:
            return {
                ...state,
                orderBook: {
                    bids: action.payload.orderBook.bids,
                    asks: action.payload.orderBook.asks
                }
            };
        case UPDATE_BIDS:
            let newStateBids = {...state};
            for (let i = 0; i < action.payload.length; i++) {
                //remove zero amount
                if (parseFloat(action.payload[i][1]) === 0) {
                    for (let [price, amount] of newStateBids.orderBook.bids) {

                        if (price === parseFloat(action.payload[i][0])) {
                            newStateBids.orderBook.bids.delete(price);
                            break;
                        }
                    }
                } else {
                    newStateBids.orderBook.bids.set(parseFloat(action.payload[i][0]), parseFloat(action.payload[i][1]))
                }
            }
            newStateBids.orderBook.bids = new Map(
                [...newStateBids.orderBook.bids.entries()]
                    .sort((a, b) => b[0] - a[0])
                    .splice(0, 100)
            );
            return newStateBids;
        case UPDATE_ASKS:
            const newStateAsk = {...state};
            for (let i = 0; i < action.payload.length; i++) {
                //remove zero amount
                if (parseFloat(action.payload[i][1]) === 0) {
                    for (let [price, amount] of newStateAsk.orderBook.asks) {

                        if (price === parseFloat(action.payload[i][0])) {
                            newStateAsk.orderBook.asks.delete(price);
                            break;
                        }
                    }
                } else {
                    newStateAsk.orderBook.asks.set(parseFloat(action.payload[i][0]), parseFloat(action.payload[i][1]))
                }
            }
            newStateAsk.orderBook.asks = new Map(
                [...newStateAsk.orderBook.asks.entries()]
                    .sort((a, b) => a[0] - b[0])
                    .splice(0, 100)
            );

            return newStateAsk;
        case SET_DIFFS: {
            const newStateDiffs = {...state};
            newStateDiffs.lastDiffs.bids.clear();
            newStateDiffs.lastDiffs.asks.clear();
            for (let i = 0; i < action.payload.b.length; i++) {
                newStateDiffs.lastDiffs.bids.set(parseFloat(action.payload.b[i][0]), parseFloat(action.payload.b[i][1]))
            }
            for (let i = 0; i < action.payload.a.length; i++) {
                newStateDiffs.lastDiffs.asks.set(parseFloat(action.payload.a[i][0]), parseFloat(action.payload.a[i][1]))
            }
            return newStateDiffs;
        }
        case SET_SYMBOL:
            let pricePrecision;
            let totalPrecision;
            let limitAmount;
            if (action.payload === 'btcusdt') {
                pricePrecision = 4;
                totalPrecision = 2;
                limitAmount = 2;
            } else if(action.payload === 'bnbbtc'){
                limitAmount = 300;
                totalPrecision = 6;
                pricePrecision = 6;
            }else{
                pricePrecision = 6;
                totalPrecision = 6;
                limitAmount = 100;
            }
            return {...state, symbol: action.payload, pricePrecision, totalPrecision, limitAmount};
        default:
            return state;
    }
};

export default reducer;
