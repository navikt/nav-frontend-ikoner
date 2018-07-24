import Checkbox from "nav-frontend-skjema/lib/checkbox";
import * as React from "react";
import * as Redux from "react-redux";
import Language from "../../language/norwegian";
import {toggleChosenExtension} from "../../redux/actions";
import {getChosenExtensions} from "../../redux/selectors";
import {IconExpanded, IconStyle, Store} from "../../redux/store-interfaces";
import './icon-download-types.less';

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

function IconDownloadTypes(props: PropTypes) {
    const uniqueLocations = findUniqueLocations(props.icon, props.iconStyle);
    const checkboxes = uniqueLocations.map((extension, index) => (
        <Checkbox
            key={index}
            label={extension}
            id={extension}
            checked={props.chosenExtensions.indexOf(extension) >= 0}
            onChange={props.toggleChosenExtension}
        />
    ));

    return (
        <div className="download-types-row">
            {checkboxes}
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
    toggleChosenExtension: (event: React.ChangeEvent<HTMLInputElement>) => dispatch(toggleChosenExtension(event)),
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconDownloadTypes);

