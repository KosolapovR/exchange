import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {configureStore} from "./state/store";
import {BrowserRouter as Router} from "react-router-dom";

const store = configureStore();

ReactDOM.render(
    <Router>
        <Provider store={store}>
            < App/>
        </Provider>
    </Router>,
    document.getElementById('root')
);
