import {FETCH_ORDER_BOOK, SET_DIFFS, SET_SYMBOL, UPDATE_ASKS, UPDATE_BIDS, WS_CONNECTED,} from "./types";

const wsConnectAC = payload => ({
    type: WS_CONNECTED,
    payload
});

const fetchOrderBookAC = payload => ({
    type: FETCH_ORDER_BOOK,
    payload
});

const setDiffsAC = payload => ({
    type: SET_DIFFS,
    payload
});

const updateBidsAC = payload => ({
    type: UPDATE_BIDS,
    payload
});

const updateAsksAC = payload => ({
    type: UPDATE_ASKS,
    payload
});

const setSymbolAC = payload => ({
    type: SET_SYMBOL,
    payload
});

export {
    wsConnectAC,
    fetchOrderBookAC,
    setDiffsAC,
    updateBidsAC,
    updateAsksAC,
    setSymbolAC
}
