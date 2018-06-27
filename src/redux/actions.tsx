export const RECEIVE_ICONS = 'RECEIVE_ICONS'
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT'

export interface IIcon {
    type: string;
    icons: any;
}

export interface ISearchText {
    type: string;
    searchText: any;
}

export function receiveIcons(icons: any): IIcon {
    return { type: RECEIVE_ICONS, icons }
}

export function setSearchText(searchText: any): ISearchText {
    return { type: SET_SEARCH_TEXT, searchText }
}

