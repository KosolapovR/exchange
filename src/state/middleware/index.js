import {WS_CONNECTED} from "../orderBook/types";
import {setDiffsAC, updateAsksAC, updateBidsAC} from "../orderBook/actions";

var socket;

const socketMiddleware = (store) => {

    return store => next => action => {
        switch (action.type) {
            case WS_CONNECTED: {
                if(socket){
                    socket.close();
                }
                socket = new WebSocket(`wss://stream.binance.com:9443/ws/${action.payload}@depth@1000ms`);
                socket.onmessage = function (event) {
                    let data = JSON.parse(event.data);
                    if (data.b.length)
                        store.dispatch(updateBidsAC(data.b));
                    if (data.a.length)
                        store.dispatch(updateAsksAC(data.a));

                    store.dispatch(setDiffsAC(data));
                };
            }
        }
        return next(action);
    };
};

export default socketMiddleware();
