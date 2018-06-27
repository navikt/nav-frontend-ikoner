import * as Redux from 'redux';
import {RECEIVE_ICONS, SET_SEARCH_TEXT} from "./actions";

const initialState = {
    fetching: false,
    icons: [],
    lastUpdated: null,
    searchText: '',
}

export function iconsReducer<T>(state = initialState, action: Redux.AnyAction) {

    switch (action.type) {
        case SET_SEARCH_TEXT:
            return {...state, ...{
                    searchText: action.searchText,
                }};
        case RECEIVE_ICONS:
            return {...state, ...{
                    fetching: false,
                    icons: action.icons,
                    lastUpdated: Date.now(),
                }};
        default:
            return state
    }
}