import {FETCH_ORDER_BOOK, WS_CONNECTED} from "./types";

const initialState = {connected: false, orderBook: {bids: null, asks: null}};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_CONNECTED:
            return {...state, connected: true};
        case FETCH_ORDER_BOOK:
            return {
                ...state,
                orderBook: {
                    bids: action.payload.orderBook.bids,
                    asks: action.payload.orderBook.asks
                }
            };
        default:
            return state;
    }
};

export default reducer;
