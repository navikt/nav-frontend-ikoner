import * as Redux from 'redux';
import {RECEIVE_ICONS, SET_SEARCH_TEXT,SET_SELECTED_ICON} from "./actions";

const initialState = {
    fetching: false,
    icons: [],
    lastUpdated: null,
    searchText: '',
    selectedIcon: {"title":"address-book","filename":"address-book.svg","link":"/nav-frontend-ikoner-backend/api/icons/address-book.svg"},
}

export function iconsReducer<T>(state = initialState, action: Redux.AnyAction) {

    switch (action.type) {
        case SET_SELECTED_ICON:
            return {...state, ...{
                    selectedIcon: action.icon,
                }};
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