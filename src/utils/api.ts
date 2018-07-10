import * as Redux from "redux";
import Config from '../appconfig';
import Language from '../language/norwegian';
import {receiveIcons, ReceiveIconsAction} from "../redux/actions";
import {IconStyle, SearchText} from "../redux/store-interfaces";

function fetchIcons(iconStyle: IconStyle, fetchFrom: number, fetchTo: number, searchText: SearchText): (dispatch: Redux.Dispatch<ReceiveIconsAction>) => Promise<ReceiveIconsAction> {

    return (dispatch: Redux.Dispatch<ReceiveIconsAction>) => {

        // Build URL
        const iStyle = iconStyle === IconStyle.FILLED ? "style=Filled" : "style=Line";
        const iSearch = searchText ? `&search=${searchText}` : "";
        const fetchInterval = fetchFrom !== undefined || fetchTo !== undefined ? `&from=${fetchFrom}&to=${fetchTo}` : "";

        return fetch  (`${Config.NAV_ICONS_API_LINK}/icons?${iStyle}${iSearch}${fetchInterval}`)
            .then(
                response => response.json(),
                error => console.log(Language.AN_ERROR_HAS_ACCURED, error)
            )
            .then(json => dispatch(receiveIcons(json.icons, json.numberOfIcons))
            );
    }

}

function fetchIcon(filename: string, iconStyle: IconStyle): (dispatch: Redux.Dispatch<ReceiveIconsAction>) => Promise<ReceiveIconsAction> {

    return (dispatch: Redux.Dispatch<ReceiveIconsAction>) => {

        // Build URL
        const iFilename = `%filename=${filename}`;
        const iStyle = iconStyle === IconStyle.FILLED ? "style=Filled" : "style=Line";
        return fetch  (`${Config.NAV_ICONS_API_LINK}/icon?${iFilename}${iStyle}`)
            .then(
                response => response.json(),
                error => console.log(Language.AN_ERROR_HAS_ACCURED, error)
            )
            .then(json => dispatch(receiveIcon(json))
            );
    }

}

const api = {
    fetchIcons,
    fetchIcon,
};

export default api;
