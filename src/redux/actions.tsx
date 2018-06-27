import {Icons} from "./store-interfaces";

export const RECEIVE_ICONS = 'RECEIVE_ICONS'
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT'

export interface ReceiveIconsAction {
    type: string;
    icons: Icons;
}

export interface SearchTextAction {
    type: string;
    searchText: string;
}

export function receiveIcons(icons: Icons): ReceiveIconsAction {
    return { type: RECEIVE_ICONS, icons }
}

export function setSearchText(searchText: string): SearchTextAction {
    return { type: SET_SEARCH_TEXT, searchText }
}

