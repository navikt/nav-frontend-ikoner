import Checkbox from "nav-frontend-skjema/lib/checkbox";
import * as React from "react";
import * as Redux from "react-redux";
import * as ReactTooltip from "react-tooltip";
import Language from "../../../language/norwegian";
import { toggleChosenExtension } from "../../../redux/actions";
import { getChosenExtensions } from "../../../redux/selectors";
import {
  IconExpanded,
  IconStyle,
  Store
} from "../../../redux/store-interfaces";
import "./icon-download-types.less";

interface PropTypes {
  chosenExtensions: string[];
  icon: IconExpanded;
  iconColor: string;
  iconStyle: IconStyle;
  toggleChosenExtension: typeof toggleChosenExtension;
}

function findUniqueExtensions(icon: IconExpanded, style: IconStyle) {
  const stylePath = (style === IconStyle.FILLED
    ? Language.FILLED_ICON
    : Language.LINE_ICON
  ).toLowerCase();
  const locations = icon.locations
    .filter(location => location.path.toLowerCase().includes(stylePath))
    .map(location => location.extension);

  return Array.from(new Set(locations));
}

function IconDownloadTypes(props: PropTypes) {
  const uniqueExtensions = findUniqueExtensions(props.icon, props.iconStyle);
  const defaultColor = "original";
  const checkboxes = uniqueExtensions.map((extension, index) => (
    <div key={index}>
      <a data-tip="" data-for={extension}>
        <Checkbox
          label={extension}
          id={extension}
          disabled={extension !== "svg" && props.iconColor !== defaultColor}
          checked={props.chosenExtensions.indexOf(extension) >= 0}
          onChange={props.toggleChosenExtension}
        />
      </a>
      {extension !== "svg" &&
        props.iconColor !== defaultColor && (
          <ReactTooltip id={extension} place="top" type="dark" effect="solid">
            <span>{Language.ORIGINAL_COLOR_ONLY}</span>
          </ReactTooltip>
        )}
    </div>
  ));

  return <div className="download-types-row">{checkboxes}</div>;
}

const mapStateToProps = (state: Store) => {
  return {
    chosenExtensions: getChosenExtensions(state),
    icon: state.iconsStore.selectedIcon,
    iconColor: state.iconsStore.iconColor,
    iconStyle: state.iconsStore.iconStyle
  };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
  toggleChosenExtension: (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(toggleChosenExtension(event))
});

export default Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(IconDownloadTypes);
