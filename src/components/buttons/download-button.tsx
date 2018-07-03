import * as React from 'react';
import {config} from "../../appconfig";
import {Icon as IIcon} from "../../redux/store-interfaces";
import './buttons.less';

interface PropTypes { icon:IIcon};
class DownloadButton extends React.Component <PropTypes> {

    public render() {
        return (
            <a download={true} href={`${config.NAV_ICONS_API_LINK}/icon/download?title=${this.props.icon.title}`} className="knapp knapp--hoved icon-download-button">
                Last ned ikon
            </a>
        );
    }
}

export default DownloadButton;