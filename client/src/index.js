import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import firebase from 'firebase';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Reducer from './redux/reducers';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCDnsjW6i3yOvQ_aDDkTk86dacPj-V6e_8",
    authDomain: "proyecto-d218c.firebaseapp.com",
    databaseURL: "https://proyecto-d218c.firebaseio.com",
    projectId: "proyecto-d218c",
    storageBucket: "proyecto-d218c.appspot.com",
    messagingSenderId: "475530440679",
    appId: "1:475530440679:web:810c8f7759056cfe"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>,
document.getElementById('root'));