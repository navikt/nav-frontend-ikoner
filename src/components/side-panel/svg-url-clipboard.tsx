import AlertStripe from "nav-frontend-alertstriper";
import { Input } from "nav-frontend-skjema";
import * as React from "react";
import * as CopyToClipboard from "react-copy-to-clipboard";
import * as Redux from "react-redux";
import Language from "../../language/norwegian";
import { getChosenExtensions } from "../../redux/selectors";
import { IconExpanded, IconStyle, Store } from "../../redux/store-interfaces";
import { iconCDNRelative } from "../../utils/api-link-creator";
import "./svg-url-clipboard.less";

interface PropTypes {
  icon: IconExpanded;
  chosenExtensions: string[];
  iconStyle: IconStyle;
  iconColor: string;
}

interface StateTypes {
  copied: boolean;
}

class SvgUrlClipboard extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      copied: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick() {
    this.setState({ copied: true });
  }

  public componentWillReceiveProps(props: PropTypes) {
    if (this.state.copied) {
      this.setState({ copied: false });
    }
  }

  public render() {
    const doesHaveSVG =
      this.findUniqueExtensions(this.props.icon, this.props.iconStyle).indexOf(
        "svg"
      ) >= 0;

    if (doesHaveSVG) {
      const svgLink = iconCDNRelative(
        this.props.iconStyle,
        this.props.iconColor,
        this.props.icon,
        "svg"
      );
      if (!this.state.copied) {
        return (
          <div className="svg-url-clipboard-container">
            <Input
              className="input-base-clipboard"
              inputClassName="input-clipboard"
              label=""
              readOnly={true}
              value={svgLink}
            />
            <CopyToClipboard text={svgLink}>
              <button
                className="copy-to-clipboard-button"
                onClick={this.handleClick}
              />
            </CopyToClipboard>
          </div>
        );
      } else {
        return (
          <div className="alert-copy-success">
            <AlertStripe type="suksess">Kopiert</AlertStripe>
          </div>
        );
      }
    }
    return <div />;
  }

  private findUniqueExtensions(icon: IconExpanded, style: IconStyle) {
    const stylePath = (style === IconStyle.FILLED
      ? Language.FILLED_ICON
      : Language.LINE_ICON
    ).toLowerCase();
    const locations = icon.locations
      .filter(location => location.path.toLowerCase().includes(stylePath))
      .map(location => location.extension);

    return Array.from(new Set(locations));
  }
}

const mapStateToProps = (state: Store) => {
  return {
    chosenExtensions: getChosenExtensions(state),
    icon: state.iconsStore.selectedIcon,
    iconColor: state.iconsStore.iconColor,
    iconStyle: state.iconsStore.iconStyle
  };
};

export default Redux.connect(mapStateToProps)(SvgUrlClipboard);
