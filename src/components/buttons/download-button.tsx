import * as React from 'react';
import * as Redux from "react-redux";
import Language from '../../language/norwegian';
import {getChosenExtensions} from "../../redux/selectors";
import {IconExpanded, IconStyle, Store} from "../../redux/store-interfaces";
import {iconDownload} from "../../utils/api-link-creator";
import './buttons.less';

interface PropTypes {
    icon: IconExpanded;
    chosenExtensions: string[];
    iconStyle: IconStyle;
    iconColor: string;
}

function DownloadButton(props: PropTypes) {
    const {icon, chosenExtensions, iconStyle, iconColor} = props;
    const link = iconDownload(iconStyle, iconColor, icon, chosenExtensions)
    return (
        <a download={true}
           className="knapp knapp--hoved icon-download-button"
           href={link} >
            {Language.DOWNLOAD_ICON}
        </a>
    );
}

const mapStateToProps = (state: Store) => {
    return {
        chosenExtensions: getChosenExtensions(state),
        icon: state.iconsStore.selectedIcon,
        iconColor: state.iconsStore.iconColor,
        iconStyle: state.iconsStore.iconStyle
    };
};

export default Redux.connect(mapStateToProps)(DownloadButton);