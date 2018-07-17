import * as React from "react";
import Config from "../../appconfig";
import {IconExpanded} from "../../redux/store-interfaces";

interface PropTypes {
    icon:IconExpanded;
    style: string;
    extension: string;
}
class ExtensionButton extends React.Component <PropTypes> {

    public render() {
        const {style, icon, extension} = this.props;
        return (
            <a className="knapp knapp--flat knapp--mini"
               href={`${Config.NAV_ICONS_API_LINK}/icon/download/extension?style=${style}&title=${icon.title}&extension=${extension}`}
               download={true}>{extension}</a>
        );
    }
}

export default ExtensionButton;