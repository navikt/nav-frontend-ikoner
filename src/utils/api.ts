import {Dispatch} from "redux";
import {receiveIcons} from "../redux/actions";

function fetchIcons(searchText: any = null): (dispatch: Dispatch<any>) => Promise<any> {
    return (dispatch: Dispatch<any>) => {
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
