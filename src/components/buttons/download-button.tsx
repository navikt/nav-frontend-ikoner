import * as React from 'react';
import Config from "../../appconfig";
import Language from '../../language/norwegian';
import {IconExpanded} from "../../redux/store-interfaces";
import './buttons.less';

interface PropTypes { icon:IconExpanded};
class DownloadButton extends React.Component <PropTypes> {

    public render() {
        return (
            <a download={true} href={`${Config.NAV_ICONS_API_LINK}/icon/download?title=${this.props.icon.title}`} className="knapp knapp--hoved icon-download-button">
                {Language.DOWNLOAD_ICON}
            </a>
        );
    }
}

export default DownloadButton;