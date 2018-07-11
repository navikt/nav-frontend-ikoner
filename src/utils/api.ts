import * as Redux from "redux";
import Config from '../appconfig';
import Language from '../language/norwegian';
import {
    receiveIcons,
    ReceiveIconsAction,
    SelectedIconAction,
    setSelectedIcon
} from "../redux/actions";
import {IconStyle, SearchText} from "../redux/store-interfaces";

function fetchIcons(iconStyle: IconStyle, fetchFrom: number, fetchTo: number, searchText: SearchText): (dispatch: Redux.Dispatch<ReceiveIconsAction>) => Promise<ReceiveIconsAction> {

    return (dispatch: Redux.Dispatch<ReceiveIconsAction>) => {
        // Build URL
        const iStyle = iconStyle === IconStyle.FILLED ? "style=Filled" : "style=Line";
        const iSearch = searchText ? `&search=${searchText}` : "";
        const fetchInterval = fetchFrom !== undefined || fetchTo !== undefined ? `&from=${fetchFrom}&to=${fetchTo}` : "";

        return fetch  (`${Config.NAV_ICONS_API_LINK}/icons?${iStyle}${iSearch}${fetchInterval}`)
            .then(response => response.json())
            .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
            .then(json => dispatch(receiveIcons(json.icons, json.numberOfIcons)));
    }
}

function fetchIcon(id: string, iconStyle: IconStyle): (dispatch: Redux.Dispatch<SelectedIconAction>) => Promise<SelectedIconAction> {

    return (dispatch: Redux.Dispatch<SelectedIconAction>) => {
        // Build URL
        const iStyle = iconStyle === IconStyle.FILLED ? "Filled" : "Line";
        console.log(`${id} ${iStyle} `);

        return fetch  (`${Config.NAV_ICONS_API_LINK}/icon/${iStyle}/${id}`)
            .then(response => response.json())
            .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
            .then(json => dispatch(setSelectedIcon(json)));
    }
}

function insertTag(text: string, icon: string, style: IconStyle): (dispatch: Redux.Dispatch<any>) => Promise<any> {

    return (dispatch: Redux.Dispatch<any>) => {
        // Build request.body
        const data = JSON.stringify({icon, text});

        return fetch  (`${Config.NAV_ICONS_API_LINK}/tag`, {
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST'})
            .then(response => response.json())
            .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
            .then(json => {console.log(json); return dispatch(fetchIcon(icon, style));});
    }
}

function deleteTag(id: string, icon: string, style: IconStyle): (dispatch: Redux.Dispatch<any>) => Promise<any> {

    return (dispatch: Redux.Dispatch<any>) => {
        return fetch  (`${Config.NAV_ICONS_API_LINK}/tag/${id}`, {method: 'DELETE'} )
            .then(response => response.json())
            .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
            .then(json => {console.log(json); return dispatch(fetchIcon(icon, style));});
    }
}




function editIcon(id: string, title: string, description: string, style: IconStyle): (dispatch: Redux.Dispatch<any>) => Promise<any> {

    return (dispatch: Redux.Dispatch<any>) => {

        console.log(`${id} got new title ${title} or description ${description} `);
        const data = JSON.stringify({id, title, description });
        return fetch  (`${Config.NAV_ICONS_API_LINK}/icon`, {
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'PATCH'}
            )
            .then(response => response.json())
            .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
            .then(json =>  dispatch(fetchIcon(id, style)));
    }
}

const api = {
    deleteTag,
    editIcon,
    fetchIcon,
    fetchIcons,
    insertTag,
};

export default api;
