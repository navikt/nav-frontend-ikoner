import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { iconsReducer } from "./reducers";

/* tslint:disable */
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    iconsStore: iconsReducer
  }),
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
/* tslint:enabled */
