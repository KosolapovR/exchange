import {applyMiddleware, combineReducers, createStore} from "redux";
import orderBookReducer from "./orderBook";
import reduxThunk from 'redux-thunk';
import middleware from "./middleware";

export const configureStore = () => {
    const rootReducer = combineReducers({orderBookReducer});
    return createStore(rootReducer, applyMiddleware(reduxThunk, middleware));
};
