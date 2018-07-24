import Config from '../appconfig';
import {IconStyle} from "../redux/store-interfaces";
import LinkCreator from './api-link-creator';

export function fetchIcons(iconStyle: IconStyle, fetchFrom: number, fetchTo: number, searchText?: string) : Promise<Response> {
    const iStyle = LinkCreator.iconStyle(iconStyle);
    const iSearch = LinkCreator.searchText(searchText);
    const iFetchInterval = LinkCreator.fetchInterval(fetchFrom, fetchTo);
    return fetch(`${Config.NAV_ICONS_API_LINK}/icons?${iStyle}${iSearch}${iFetchInterval}`);
}

export function fetchIcon(iconStyle: IconStyle, id: string): Promise<Response> {
    const iStyle = LinkCreator.iconStyleToString(iconStyle);
    return fetch(`${Config.NAV_ICONS_API_LINK}/icon/${iStyle}/${id}`);
}

export function fetchTags() : Promise<Response> {
    return fetch(`${Config.NAV_ICONS_API_LINK}/tags`);
}

export function deleteTag(id: string): Promise<Response>  {
   return fetch(`${Config.NAV_ICONS_API_LINK}/tag/${id}`, {method: 'DELETE'} );
}

export function insertTag(text: string, icon: string) : Promise<Response>  {
    return fetch  (`${Config.NAV_ICONS_API_LINK}/tag`, {
        body: JSON.stringify({icon, text}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST'});
}

export function editIcon(id: string, title: string, description: string) : Promise<Response> {
    return fetch  (`${Config.NAV_ICONS_API_LINK}/icon`, {
        body: JSON.stringify({id, title, description }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'PATCH'}
    );
}
