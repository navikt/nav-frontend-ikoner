import * as Redux from "redux";
import Config from '../appconfig';
import Language from '../language/norwegian';
import {IconTitleDescription, receiveIcons, ReceiveIconsAction, setIconTitleDescription} from "../redux/actions";
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


function editIcon(filename: string, title: string, description: string): (dispatch: Redux.Dispatch<IconTitleDescription>) => Promise<IconTitleDescription> {

    return (dispatch: Redux.Dispatch<IconTitleDescription>) => {

        // Build URL
        const iFilename = `filename=${filename}`;
        const iTitle = `&title=${title}`;
        const iDescription = `&description=${description}`;

        return fetch  (`${Config.NAV_ICONS_API_LINK}/icon/edit?${iFilename}${iTitle}${iDescription}`)
            .then(
                response => response.json(),
                error => console.log(Language.AN_ERROR_HAS_ACCURED, error)
            )
            .then(json => dispatch(setIconTitleDescription(json.title, json.description))
            );
    }
}

const api = {
    editIcon,
    fetchIcons,
};

export default api;
