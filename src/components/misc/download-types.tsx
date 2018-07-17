import * as React from "react";
import Config from "../../appconfig";
import Language from "../../language/norwegian";
import {IconExpanded, IconStyle} from "../../redux/store-interfaces";
import './misc.less';

interface PropTypes {
    icon: IconExpanded;
    iconStyle: IconStyle;
}

class DownloadTypes extends React.Component<PropTypes> {

    public render() {
        const style = this.props.iconStyle === IconStyle.FILLED ? Language.FILLED_ICON : Language.LINE_ICON;
        const svg = "svg";
        const png = "png";
        const pdf = "pdf";
        const ai = "ai";
        const sketch = "sketch";
        const eps = "eps";
        return (
            <div>
                <div className="download-types-row">
                    <a className="knapp knapp--flat knapp--mini"
                       href={`${Config.NAV_ICONS_API_LINK}/icon/download/extension?style=${style}&title=${this.props.icon.title}&extension=${svg}`}
                       download={true}>{svg}</a>
                    <a className="knapp knapp--flat knapp--mini"
                       href={`${Config.NAV_ICONS_API_LINK}/icon/download/extension?style=${style}&title=${this.props.icon.title}&extension=${png}`}
                       download={true}>{png}</a>
                    <a className="knapp knapp--flat knapp--mini"
                       href={`${Config.NAV_ICONS_API_LINK}/icon/download/extension?style=${style}&title=${this.props.icon.title}&extension=${pdf}`}
                       download={true}>{pdf}</a>
                </div>
                <div className="download-types-row">
                    <a className="knapp knapp--flat knapp--mini"
                       href={`${Config.NAV_ICONS_API_LINK}/icon/download/extension?style=${style}&title=${this.props.icon.title}&extension=${ai}`}
                       download={true}>{ai}</a>
                    <a className="knapp knapp--flat knapp--mini"
                       href={`${Config.NAV_ICONS_API_LINK}/icon/download/extension?style=${style}&title=${this.props.icon.title}&extension=${sketch}`}
                       download={true}>{sketch}</a>
                    <a className="knapp knapp--flat knapp--mini"
                       href={`${Config.NAV_ICONS_API_LINK}/icon/download/extension?style=${style}&title=${this.props.icon.title}&extension=${eps}`}
                       download={true}>{eps}</a>
                </div>
            </div>
        );
    }
}

export default DownloadTypes;


