import * as Redux from 'redux';
import Config from '../appconfig';
import {
    RECEIVE_ICONS,
    RECEIVE_TAGS,
    SET_FETCH_INTERVAL,
    SET_FETCHING_ICONS,
    SET_ICON_BACKGROUND_COLOR,
    SET_ICON_COLOR,
    SET_ICON_STYLE,
    SET_SEARCH_TEXT,
    SET_SELECTED_ICON,
    SET_SELECTED_ICON_INDEX,
    TOGGLE_CHOSEN_EXTENSION
} from "./actions-constants";

import {IconsStore, IconStyle} from "./store-interfaces";

const initialState: IconsStore = {
    chosenExtensions: {svg: true},
    fetchFrom: 0,
    fetchHasMore: true,
    fetchTo: Config.NAV_ICONS_FETCH_INTERVAL_SIZE,
    fetchingCounter: 0,
    iconBackgroundColor: 'white',
    iconColor: '#000000',
    iconStyle: IconStyle.FILLED,
    icons: [],
    lastUpdated: undefined,
    searchText: '',
    selectedIcon: undefined,
    selectedIconIndex: 0,
    tags: []
};

export function iconsReducer<T>(state = initialState, action: Redux.AnyAction): IconsStore {

    const RESET_FETCH = {
        fetchFrom: 0,
        fetchHasMore: true,
        fetchTo: Config.NAV_ICONS_FETCH_INTERVAL_SIZE,
        icons: [],
        selectedIconIndex: 0
    };

    switch (action.type) {
        case SET_SELECTED_ICON:
            return {
                ...state, ...{
                    chosenExtensions: {svg: true},
                    selectedIcon: action.icon,
                }
            };
        case SET_SELECTED_ICON_INDEX:
            return {
                ...state, ...{
                    selectedIconIndex: action.index,
                }
            };
        case SET_FETCHING_ICONS:
            return {
                ...state, ...{
                    fetchingCounter: state.fetchingCounter++,
                }
            };
        case SET_ICON_STYLE:
            return {
                ...state, ...{
                    iconStyle: action.iconStyle,
                    ...RESET_FETCH
                }
            };
        case SET_ICON_COLOR:
            return {
                ...state, ...{
                    chosenExtensions: action.iconColor === "#000000" ? state.chosenExtensions : {svg: true},
                    iconColor: action.iconColor
                }
            };
        case SET_ICON_BACKGROUND_COLOR:
            return {
                ...state, ...{
                    iconBackgroundColor: action.iconBackgroundColor,
                }
            };
        case SET_SEARCH_TEXT:
            return {
                ...state, ... {
                    searchText: action.searchText,
                    ...RESET_FETCH
                }
            };
        case SET_FETCH_INTERVAL:
            return {
                ...state, ...{
                    fetchFrom: action.fetchFrom,
                    fetchTo: action.fetchTo,
                }
            };
        case RECEIVE_ICONS:
            const icons = state.fetchFrom > 0 ? state.icons.concat(action.icons) : action.icons;
            return {
                ...state, ...{
                    fetchHasMore: action.icons.length === Config.NAV_ICONS_FETCH_INTERVAL_SIZE,
                    fetchingCounter: state.fetchingCounter--,
                    icons,
                    lastUpdated: new Date()
                }
            };
        case RECEIVE_TAGS:
            return {
                ...state, ...{
                    tags: action.tags,
                }
            };
        case TOGGLE_CHOSEN_EXTENSION:
            const nState = {...state.chosenExtensions};
            nState[action.extension] = !nState[action.extension];
            return {...state, chosenExtensions: {...nState}};
        default:
            return state
    }
}