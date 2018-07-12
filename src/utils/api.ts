import * as Redux from "redux";
import Config from '../appconfig';
import Language from '../language/norwegian';
import {
    receiveIcons,
    ReceiveIconsAction,
    receiveTags,
    ReceiveTagsAction,
    SelectedIconAction,
    setSelectedIcon
} from "../redux/actions";
import {IconStyle, SearchText} from "../redux/store-interfaces";
import LinkCreator from './api-link-creator';
const debounce = require('lodash.debounce'); // tslint:disable-line

// Create debouncer to prevent user from calling API too frequent
const fetchIconsDispatchDebounced = debounce(fetchIconsDispatch, 100);
function fetchIconsDispatch(dispatch: Redux.Dispatch<ReceiveIconsAction>,
                            iconStyle: IconStyle,
                            fetchFrom: number,
                            fetchTo: number,
                            searchText: SearchText) {

    // Build parameters
    const iStyle = LinkCreator.iconStyle(iconStyle);
    const iSearch = LinkCreator.searchText(searchText);
    const fetchInterval = LinkCreator.fetchInterval(fetchFrom, fetchTo);
    return fetch  (`${Config.NAV_ICONS_API_LINK}/icons?${iStyle}${iSearch}${fetchInterval}`)
        .then(response => response.json())
        .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
        .then(json => dispatch(receiveIcons(json.icons, json.numberOfIcons)));
}

function fetchIcons(iconStyle: IconStyle, fetchFrom: number, fetchTo: number,
                    searchText: SearchText) : (dispatch: Redux.Dispatch<ReceiveIconsAction>) => Promise<ReceiveIconsAction> {
    return (dispatch: Redux.Dispatch<ReceiveIconsAction>) => {
        return fetchIconsDispatchDebounced(dispatch, iconStyle, fetchFrom, fetchTo, searchText);
    };
}

function fetchIcon(id: string, iconStyle: IconStyle): (dispatch: Redux.Dispatch<SelectedIconAction>) => Promise<SelectedIconAction> {
    return (dispatch: Redux.Dispatch<SelectedIconAction>) => {
        // Build URL
        const iStyle = LinkCreator.iconStyle(iconStyle);
        return fetch  (`${Config.NAV_ICONS_API_LINK}/icon/${iStyle}/${id}`)
            .then(response => response.json())
            .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
            .then(json => dispatch(setSelectedIcon(json)));
    }
}

function fetchTags() : (dispatch: Redux.Dispatch<ReceiveTagsAction>) => Promise<ReceiveTagsAction> {
    return (dispatch: Redux.Dispatch<ReceiveTagsAction>) => {
        return fetch  (`${Config.NAV_ICONS_API_LINK}/tags`)
            .then(response => response.json())
            .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
            .then(json => dispatch(receiveTags(json)));
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
            .then(() => dispatch(fetchIcon(icon, style)))
            .then(() => dispatch(fetchTags()));
    }
}

function deleteTag(id: string, icon: string, style: IconStyle): (dispatch: Redux.Dispatch<any>) => Promise<any> {
    return (dispatch: Redux.Dispatch<any>) => {
        return fetch  (`${Config.NAV_ICONS_API_LINK}/tag/${id}`, {method: 'DELETE'} )
            .then(response => response.json())
            .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
            .then(json => dispatch(fetchIcon(icon, style)))
            .then(() => dispatch(fetchTags()));
    }
}

function editIcon(id: string, title: string, description: string, style: IconStyle): (dispatch: Redux.Dispatch<any>) => Promise<any> {
    return (dispatch: Redux.Dispatch<any>) => {
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
    fetchTags,
    insertTag,
};

export default api;
