import {applyMiddleware, compose, createStore} from 'redux';
import {icons} from './reducers';

import thunkMiddleware from 'redux-thunk';


/* tslint:disable */

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    icons,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
        ))
);
/* tslint:enabled */