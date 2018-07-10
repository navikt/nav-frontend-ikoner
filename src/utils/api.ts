import * as Redux from "redux";
import Config from '../appconfig';
import Language from '../language/norwegian';
import {receiveIcons, ReceiveIconsAction, SelectedIconAction, setSelectedIcon} from "../redux/actions";
import {IconStyle, SearchText} from "../redux/store-interfaces";

function fetchIcons(iconStyle: IconStyle, fetchFrom: number, fetchTo: number, searchText: SearchText): (dispatch: Redux.Dispatch<ReceiveIconsAction>) => Promise<ReceiveIconsAction> {

    return (dispatch: Redux.Dispatch<ReceiveIconsAction>) => {
        // Build URL
        const iStyle = iconStyle === IconStyle.FILLED ? "Filled" : "Line";
        const iSearch = searchText ? `&search=${searchText}` : "";
        const fetchInterval = fetchFrom !== undefined || fetchTo !== undefined ? `&from=${fetchFrom}&to=${fetchTo}` : "";

        return fetch  (`${Config.NAV_ICONS_API_LINK}/icons/${iStyle}?${iSearch}${fetchInterval}`)
            .then(response => response.json())
            .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
            .then(json => dispatch(receiveIcons(json.icons, json.numberOfIcons)));
    }
}

function fetchIcon(filename: string, iconStyle: IconStyle): (dispatch: Redux.Dispatch<SelectedIconAction>) => Promise<SelectedIconAction> {

    return (dispatch: Redux.Dispatch<SelectedIconAction>) => {

        // Build URL
        const iStyle = iconStyle === IconStyle.FILLED ? "Filled" : "Line";

        return fetch  (`${Config.NAV_ICONS_API_LINK}/icon/${iStyle}/${filename}`)
            .then(response => response.json())
            .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
            .then(json => dispatch(setSelectedIcon(json)));
    }
}

/*
function insertTag(filename: string, iconStyle: IconStyle): (dispatch: Redux.Dispatch<SelectedIconAction>) => Promise<SelectedIconAction> {

    return (dispatch: Redux.Dispatch<SelectedIconAction>) => {
        // Build URL
        const iStyle = iconStyle === IconStyle.FILLED ? "style=Filled" : "style=Line";
        const iFilename = `&filename=${filename}`;

        return fetch  (`${Config.NAV_ICONS_API_LINK}/icon?${iStyle}${iFilename}`)
            .then(response => response.json())
            .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
            .then(json => dispatch(setSelectedIcon(json)));
    }
}
*/
const api = {
    fetchIcon,
    fetchIcons,
};

export default api;
