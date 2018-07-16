import * as Redux from 'redux';
import Config from '../appconfig';
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
    fetchTo: Config.NAV_ICONS_FETCH_INTERVAL_SIZE,
    fetchingCounter: 0,
    iconColor: 'black',
    iconStyle: IconStyle.FILLED,
    icons: [],
    lastUpdated: undefined,
    searchText: '',
    selectedIcon: undefined,
}

export function iconsReducer<T>(state = initialState, action: Redux.AnyAction) {

    const RESET_FETCH = {
        fetchFrom: 0,
        fetchHasMore: true,
        fetchTo: Config.NAV_ICONS_FETCH_INTERVAL_SIZE,
        icons: [],
    }

    switch (action.type) {
        case SET_SELECTED_ICON:
            return {...state, ...{
                    selectedIcon: action.icon,
                }};
        case SET_FETCHING_ICONS:
            return {...state, ...{
                    fetchingCounter: state.fetchingCounter + 1,
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
            return {...state, ... {
                    searchText: action.searchText,
                    ... RESET_FETCH
                }};
        case SET_FETCH_INTERVAL:
            return {...state, ...{
                    fetchFrom: action.fetchFrom,
                    fetchTo: action.fetchTo,
                }};
        case RECEIVE_ICONS:
            const icons = state.fetchFrom > 0 ? state.icons.concat(action.icons) : action.icons;
            return {...state, ...{
                    fetchHasMore: action.icons.length > Config.NAV_ICONS_FETCH_INTERVAL_SIZE,
                    fetchingCounter: state.fetchingCounter - 1,
                    icons,
                    lastUpdated: Date.now(),
                }};
        case RESET_ICON_FETCH:
            return {...state, ...{
                    ... RESET_FETCH
                }};
            break;
        default:
            return state
    }
}