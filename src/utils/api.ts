import * as Redux from "redux";
import Config from '../appconfig';
import Language from '../language/norwegian';
import {receiveIcons, ReceiveIconsAction} from "../redux/actions";
import {IconStyle, SearchText} from "../redux/store-interfaces";
import LinkCreator from './api-link-creator';
const debounce = require('lodash.debounce'); // tslint:disable-line

// Create debouncer to prevent user from calling API too frequent
function fetchIcons(iconStyle: IconStyle,
                    fetchFrom: number,
                    fetchTo: number,
                    searchText: SearchText) :
    (dispatch: Redux.Dispatch<ReceiveIconsAction>) => Promise<ReceiveIconsAction> {
    return (dispatch: Redux.Dispatch<ReceiveIconsAction>) => {
        return fetchIconsDispatchDebounced(dispatch, iconStyle, fetchFrom, fetchTo, searchText);
    };
}

const fetchIconsDispatchDebounced = debounce(fetchIconsDispatch, 100);
function fetchIconsDispatch(dispatch: Redux.Dispatch<ReceiveIconsAction>,
                            iconStyle: IconStyle,
                            fetchFrom: number,
                            fetchTo: number,
                            searchText: SearchText) {

    // Build parameters
    const iStyle = LinkCreator.iconStyle(iconStyle);
    const iSearch = LinkCreator.searchText(searchText);
    const iFetchInterval = LinkCreator.fetchInterval(fetchFrom, fetchTo);
    return fetch  (`${Config.NAV_ICONS_API_LINK}/icons?${iStyle}${iSearch}${iFetchInterval}`)
        .then(response => response.json())
        .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
        .then(json => dispatch(receiveIcons(json.icons, json.numberOfIcons)));
}

const api = {
    fetchIcons,
};

export default api;
