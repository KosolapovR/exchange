import {WS_CONNECTED} from "../orderBook/types";

const socketMiddleware = (store) => {

    return store => next => action => {
        switch (action.type) {
            case WS_CONNECTED: {
                let socket = new WebSocket(`wss://stream.binance.com:9443/ws/${action.payload}@depth@1000ms`);

                socket.onmessage = function (event) {
                    console.log(event.data);
                    // updateOrderBook(JSON.parse(event.data));
                };
            }
        }
        return next(action);
    };
};

export default socketMiddleware();
