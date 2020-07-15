import {
    WS_CONNECTED,
    FETCH_ORDER_BOOK,
} from "./types";

const wsConnectAC = payload => ({
    type: WS_CONNECTED,
    payload
});

const fetchOrderBookAC = payload => ({
    type: FETCH_ORDER_BOOK,
    payload
});

export {
    wsConnectAC,
    fetchOrderBookAC,
}
