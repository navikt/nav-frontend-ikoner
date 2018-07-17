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
        const style = this.props.iconStyle === IconStyle.FILLED ? Language.FILLED_ICON : Language.LINE_ICON;

        // Find all unique extensions of current icon
        const duplicateExtensions: string[] = [];
        this.props.icon.locations
            .filter(location => location.path.toLowerCase().includes(style.toLowerCase()))
            .map(location => duplicateExtensions.push(location.extension));
        const uniqueExtensions = Array.from(new Set(duplicateExtensions));

        return (
            <div className="download-types-row">
                {uniqueExtensions.map((extension, index) =>
                    <ExtensionButton key={index} extension={extension} icon={this.props.icon} style={style}/>
                )}
            </div>
        );
    }
}

export default DownloadTypes;


