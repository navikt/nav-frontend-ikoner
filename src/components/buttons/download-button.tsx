import * as React from 'react';
import * as Redux from "react-redux";
import Config from "../../appconfig";
import Language from '../../language/norwegian';
import {getChosenExtensions} from "../../redux/selectors";
import {IconExpanded, IconStyle, Store} from "../../redux/store-interfaces";
import LinkCreator from "../../utils/api-link-creator";
import './buttons.less';

interface PropTypes {
    icon: IconExpanded;
    chosenExtensions: string[];
    iconStyle: IconStyle;
}

function DownloadButton(props: PropTypes) {

    const {icon, chosenExtensions, iconStyle} = props;
    const style = LinkCreator.iconStyleToString(iconStyle);
    return (
        <a download={true}
           href={`${Config.NAV_ICONS_API_LINK}/icon/download?title=${icon.title}&style=${style}&extensions=${chosenExtensions.join(",")}`}
           className="knapp knapp--hoved icon-download-button"
        >
            {Language.DOWNLOAD_ICON}
        </a>
    );
}

const mapStateToProps = (state: Store) => {
    return {
        chosenExtensions: getChosenExtensions(state),
        icon: state.iconsStore.selectedIcon,
        iconStyle: state.iconsStore.iconStyle,
    };
};

export default Redux.connect(mapStateToProps)(DownloadButton);