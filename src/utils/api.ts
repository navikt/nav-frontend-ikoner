import * as Redux from "redux";
import {receiveIcons, ReceiveIconsAction} from "../redux/actions";
import {IconStyle, SearchText} from "../redux/store-interfaces";

function fetchIcons(iconStyle: IconStyle, searchText: SearchText): (dispatch: Redux.Dispatch<ReceiveIconsAction>) => Promise<ReceiveIconsAction> {

    return (dispatch: Redux.Dispatch<ReceiveIconsAction>) => {

        // Build URL
        const iStyle = iconStyle === IconStyle.FILLED ? "style=Filled" : "style=Line";
        const iSearch = searchText ? `&search=${searchText}` : "";

        return fetch(`/nav-frontend-ikoner-backend/api/icons?${iStyle}${iSearch}`)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json => dispatch(receiveIcons(json))
            );
    }
}

const api = {
    fetchIcons,
};

export default api;
