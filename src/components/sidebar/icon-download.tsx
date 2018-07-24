import Checkbox from "nav-frontend-skjema/lib/checkbox";
import * as React from "react";
import * as Redux from "react-redux";
import Language from "../../language/norwegian";
import {toggleChosenExtension} from "../../redux/actions";
import {getChosenExtensions} from "../../redux/selectors";
import {IconExpanded, IconStyle, Store} from "../../redux/store-interfaces";
import DownloadButton from "../buttons/download-button";
import './icon-download.less';

interface PropTypes {
    chosenExtensions: string[];
    icon: IconExpanded;
    iconStyle: IconStyle;
    toggleChosenExtension: typeof toggleChosenExtension;
}

function findUniqueLocations(icon: IconExpanded, style: IconStyle) {
    const stylePath = (style === IconStyle.FILLED ? Language.FILLED_ICON : Language.LINE_ICON).toLowerCase();
    const locations = icon.locations
        .filter((location) => location.path.toLowerCase().includes(stylePath))
        .map((location) => location.extension);

    return Array.from(new Set(locations));
}

function IconDownload(props: PropTypes) {
    const uniqueLocation = findUniqueLocations(props.icon, props.iconStyle);
    const checkboxes = uniqueLocation.map((extension, index) => (
        <Checkbox
            key={index}
            label={extension}
            id={extension}
            checked={props.chosenExtensions.indexOf(extension) >= 0}
            onClick={props.toggleChosenExtension}
        />
    ));

    return (
        <div className="download-types-row">
            {checkboxes}
            <DownloadButton/>
        </div>
    );
}

const mapStateToProps = (state: Store) => {
    return {
        chosenExtensions: getChosenExtensions(state),
        icon: state.iconsStore.selectedIcon,
        iconStyle: state.iconsStore.iconStyle,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
    toggleChosenExtension: (extension: React.MouseEvent<HTMLInputElement>) => dispatch(toggleChosenExtension(extension)),
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconDownload);

