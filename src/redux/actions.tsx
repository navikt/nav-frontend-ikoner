import {Icon, Icons} from "./store-interfaces";

export const RECEIVE_ICONS = 'RECEIVE_ICONS'
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT'
export const SET_SELECTED_ICON = 'SET_SELECTED_ICON'
export const SET_ICON_COLOR = 'SET_ICON_COLOR'

/*
    Interfaces
 */
export interface ReceiveIconsAction {
    type: string;
    icons: Icons;
}

export interface SearchTextAction {
    type: string;
    searchText: string;
}

export interface SelectedIconAction {
    type: string;
    icon: Icon;
}

export interface IconColorAction {
    type: string;
    iconColor: string;
}

/*
    Actions
 */

export function receiveIcons(icons: Icons): ReceiveIconsAction {
    return { type: RECEIVE_ICONS, icons }
}

export function setSelectedIcon(icon: Icon): SelectedIconAction {
    return { type: SET_SELECTED_ICON, icon }
}

export function setSearchText(searchText: string): SearchTextAction {
    return { type: SET_SEARCH_TEXT, searchText }
}

export function setIconColor(iconColor: string): IconColorAction {
    return { type: SET_ICON_COLOR, iconColor }
}


