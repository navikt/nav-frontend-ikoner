import * as React from 'react';
import * as Redux from "react-redux";
import Config from "../../appconfig";
import Language from '../../language/norwegian';
import {getChosenExtensions} from "../../redux/selectors";
import {IconExpanded, IconStyle, Store} from "../../redux/store-interfaces";
import './buttons.less';

interface PropTypes {
    icon:IconExpanded,
    chosenExtensions: string[],
    iconStyle: IconStyle,
};

class DownloadButton extends React.Component <PropTypes> {


    public render() {
        const style = this.props.iconStyle === IconStyle.FILLED ? Language.FILLED_ICON : Language.LINE_ICON;
        return (
            <a download={true} href={`${Config.NAV_ICONS_API_LINK}/icon/download?title=${this.props.icon.title}&style=${style}&extensions=${this.props.chosenExtensions.join(",")}`} className="knapp knapp--hoved icon-download-button">
                {Language.DOWNLOAD_ICON}
            </a>
        );
    }
}

const mapStateToProps = (state: Store) => {
    return {
        chosenExtensions: getChosenExtensions(state),
        icon: state.iconsStore.selectedIcon,
        iconStyle: state.iconsStore.iconStyle,
    };
};

export default Redux.connect(mapStateToProps)(DownloadButton);


