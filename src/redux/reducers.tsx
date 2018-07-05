import * as Redux from 'redux';
import {RECEIVE_ICONS, SET_ICON_COLOR, SET_SEARCH_TEXT, SET_SELECTED_ICON} from "./actions";
import {IconsStore} from "./store-interfaces";

const initialState : IconsStore = {
    fetching: true,
    iconColor: 'black',
    icons: [],
    lastUpdated: undefined,
    searchText: '',
    selectedIcon: undefined,
}

export function iconsReducer<T>(state = initialState, action: Redux.AnyAction) {

    switch (action.type) {
        case SET_SELECTED_ICON:
            return {...state, ...{
                    selectedIcon: action.icon,
                }};
        case SET_ICON_COLOR:
            return {...state, ...{
                    iconColor: action.iconColor,
                }};
        case SET_SEARCH_TEXT:
            return {...state, ...{
                    fetching: true,
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