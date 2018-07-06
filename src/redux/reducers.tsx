import * as Redux from 'redux';
import {config} from '../appconfig';
import {
    RECEIVE_ICONS, RESET_ICON_FETCH, SET_FETCH_INTERVAL,
    SET_FETCHING_ICONS,
    SET_ICON_COLOR,
    SET_ICON_STYLE,
    SET_SEARCH_TEXT,
    SET_SELECTED_ICON
} from "./actions";
import {IconsStore, IconStyle} from "./store-interfaces";

const initialState : IconsStore = {
    fetchFrom: 0,
    fetchHasMore: true,
    fetchTo: config.NAV_ICONS_FETCH_INTERVAL_SIZE,
    fetching: false,
    iconColor: 'black',
    iconStyle: IconStyle.FILLED,
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
        case SET_FETCHING_ICONS:
            return {...state, ...{
                    fetching: action.fetching,
                }};
        case SET_ICON_STYLE:
            return {...state, ...{
                    iconStyle: action.iconStyle,
                }};
        case SET_ICON_COLOR:
            return {...state, ...{
                    iconColor: action.iconColor,
                }};
        case SET_SEARCH_TEXT:
            return {...state, ...{
                    searchText: action.searchText,
                }};
        case SET_FETCH_INTERVAL:
            return {...state, ...{
                    fetchFrom: action.fetchFrom,
                    fetchTo: action.fetchTo,
                }};
        case RECEIVE_ICONS:
            return {...state, ...{
                    fetchHasMore: state.icons.concat(action.icons).length === action.numberOfIcons ? false : true,
                    fetching: false,
                    icons: state.icons.concat(action.icons),
                    lastUpdated: Date.now(),
                }};
        case RESET_ICON_FETCH:
            return {...state, ...{
                    fetchFrom: 0,
                    fetchHasMore: true,
                    fetchTo: 100,
                    icons: [],
                    lastUpdated: Date.now(),
                }};
            break;
        default:
            return state
    }
}