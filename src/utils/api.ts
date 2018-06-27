import * as Redux from "redux";
import {receiveIcons, ReceiveIconsAction} from "../redux/actions";
import {SearchText} from "../redux/store-interfaces";

function fetchIcons(searchText: SearchText): (dispatch: Redux.Dispatch<ReceiveIconsAction>) => Promise<ReceiveIconsAction> {
    return (dispatch: Redux.Dispatch<ReceiveIconsAction>) => {
        return fetch(searchText ? `/nav-frontend-ikoner-backend/api/icons?search=${searchText}` : `/nav-frontend-ikoner-backend/api/icons`)
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
