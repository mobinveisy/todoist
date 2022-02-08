import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import {applyMiddleware, createStore, compose} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
let store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

