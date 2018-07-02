import * as React from 'react';
import {config} from "../../appconfig";
import {Icon as IIcon} from "../../redux/store-interfaces";
import '../misc/misc.less';

interface PropTypes { icon:IIcon};
class DownloadButton extends React.Component <PropTypes> {

    public render() {
        return (
            <a download={true} href={`${config.NAV_ICONS_API_LINK}/icon/download?title=${this.props.icon.title}`} className="selected-icon-download-link">
                <button type="submit" className="knapp knapp--hoved selected-icon-download-button">Last ned ikon</button>
            </a>
        );
    }
}

export default DownloadButton;