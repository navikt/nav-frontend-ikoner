import * as React from "react";
import Language from "../../language/norwegian";
import {IconExpanded, IconStyle} from "../../redux/store-interfaces";
import ExtensionButton from "../buttons/extension-button";
import './misc.less';

interface PropTypes {
    icon: IconExpanded;
    iconStyle: IconStyle;
}

class DownloadTypes extends React.Component<PropTypes> {

    public render() {

        const {icon, iconStyle} = this.props;
        const style = iconStyle === IconStyle.FILLED ? Language.FILLED_ICON : Language.LINE_ICON;

        const svg = "svg";
        const svgExist = icon.locations
                .filter(location => location.path.includes(style))
                .filter(location => location.extension === svg).length > 0;

        const png = "png";
        const pngExist = this.props.icon.locations
                .filter(location => location.path.includes(style))
                .filter(location => location.extension === png).length > 0;

        const pdf = "pdf";
        const pdfExist = this.props.icon.locations
                .filter(location => location.path.includes(style))
                .filter(location => location.extension === pdf).length > 0;

        const ai = "ai";
        const aiExist = this.props.icon.locations
                .filter(location => location.path.includes(style))
                .filter(location => location.extension === ai).length > 0;

        const sketch = "sketch";
        const sketchExist = this.props.icon.locations
                .filter(location => location.path.includes(style))
                .filter(location => location.extension === sketch).length > 0;

        const eps = "eps";
        const epsExist = this.props.icon.locations
                .filter(location => location.path.includes(style))
                .filter(location => location.extension === eps).length > 0;

        return (
            <div>
                <div className="download-types-row">
                    {svgExist && <ExtensionButton extension={svg} icon={icon} style={style}/>}
                    {pngExist && <ExtensionButton extension={png} icon={icon} style={style}/>}
                    {pdfExist && <ExtensionButton extension={pdf} icon={icon} style={style}/>}
                    {aiExist && <ExtensionButton extension={ai} icon={icon} style={style}/>}
                    {sketchExist && <ExtensionButton extension={sketch} icon={icon} style={style}/>}
                    {epsExist && <ExtensionButton extension={eps} icon={icon} style={style}/>}
                </div>
            </div>
        );
    }
}

export default DownloadTypes;


