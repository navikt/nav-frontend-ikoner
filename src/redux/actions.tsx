import {IconExpanded, Icons, IconStyle, Tags} from "./store-interfaces";

export const RECEIVE_ICONS = 'RECEIVE_ICONS'
export const RECEIVE_TAGS = 'RECEIVE_TAGS'
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT'
export const SET_SELECTED_ICON = 'SET_SELECTED_ICON'
export const SET_ICON_COLOR = 'SET_ICON_COLOR'
export const SET_ICON_STYLE = 'SET_ICON_STYLE'
export const SET_FETCHING_ICONS = 'SET_FETCHING_ICONS'
export const SET_FETCH_INTERVAL = 'SET_FETCH_INTERVAL'
export const TOGGLE_CHOSEN_EXTENSION = 'TOGGLE_CHOSEN_EXTENSION'

/*
    Interfaces
 */
export interface ReceiveIconsAction {
    type: string;
    icons: Icons;
    numberOfIcons: number;
}

export interface ReceiveTagsAction {
    type: string;
    tags: Tags;
}

export interface SearchTextAction {
    type: string;
    searchText: string;
}

export interface SelectedIconAction {
    type: string;
    icon: IconExpanded;
}

export interface IconColorAction {
    type: string;
    iconColor: string;
}

export interface IconColorStyle {
    type: string,
    iconStyle: IconStyle,
}

export interface FetchingIconsAction {
    type: string,
}

export interface FetchingInterval {
    type: string,
    fetchFrom: number,
    fetchTo: number,
}

export interface ChosenExtensions {
    type: string,
    extension: string,
}

/*
    Actions
 */

export function receiveIcons(icons: Icons, numberOfIcons: number): ReceiveIconsAction {
    return {type: RECEIVE_ICONS, icons, numberOfIcons}
}

export function receiveTags(tags: Tags): ReceiveTagsAction {
    return {type: RECEIVE_TAGS, tags}
}

export function setSelectedIcon(icon: IconExpanded): SelectedIconAction {
    return {type: SET_SELECTED_ICON, icon}
}

export function setSearchText(searchText: string): SearchTextAction {
    return {type: SET_SEARCH_TEXT, searchText}
}

export function setIconColor(iconColor: string): IconColorAction {
    return {type: SET_ICON_COLOR, iconColor}
}

export function setIconStyle(iconStyle: IconStyle): IconColorStyle {
    return {type: SET_ICON_STYLE, iconStyle}
}

export function setFetchingIcons(): FetchingIconsAction {
    return {type: SET_FETCHING_ICONS}
}

export function setFetchingInterval(fetchFrom: number, fetchTo: number): FetchingInterval {
    return {type: SET_FETCH_INTERVAL, fetchFrom, fetchTo}
}

export function toggleChosenExtension(event: React.MouseEvent<HTMLInputElement>): ChosenExtensions {
    const extension: string = event.currentTarget.id;
    return {type: TOGGLE_CHOSEN_EXTENSION, extension}
}