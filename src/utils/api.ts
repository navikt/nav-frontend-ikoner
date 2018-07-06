import * as Redux from "redux";
import {config} from '../appconfig';
import {receiveIcons, ReceiveIconsAction} from "../redux/actions";
import {IconStyle, SearchText} from "../redux/store-interfaces";

function fetchIcons(iconStyle: IconStyle, fetchFrom: number, fetchTo: number, searchText: SearchText): (dispatch: Redux.Dispatch<ReceiveIconsAction>) => Promise<ReceiveIconsAction> {

    return (dispatch: Redux.Dispatch<ReceiveIconsAction>) => {

        // Build URL
        const iStyle = iconStyle === IconStyle.FILLED ? "style=Filled" : "style=Line";
        const iSearch = searchText ? `&search=${searchText}` : "";
        const fetchInterval = fetchFrom !== undefined || fetchTo !== undefined ? `&from=${fetchFrom}&to=${fetchTo}` : "";

        return fetch  (`${config.NAV_ICONS_API_LINK}/icons?${iStyle}${iSearch}${fetchInterval}`)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json => dispatch(receiveIcons(json.icons, json.numberOfIcons))
            );
    }

}

const api = {
    fetchIcons,
};

export default api;
