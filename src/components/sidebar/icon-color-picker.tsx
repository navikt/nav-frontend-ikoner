import * as React from "react";
import * as Redux from "react-redux";
import Language from "../../language/norwegian";
import { ColorPickerType, Store } from "../../redux/store-interfaces";
import { colors } from "../../utils/colors";
import "../misc/misc.less";
import IconColorPickerSwatch from "./icon-color-picker-swatch";
import "./icon-color-picker.less";
import "./tags.less";

interface PropTypes {
  iconColor: string | undefined;
  iconBackgroundColor: string;
  type?: ColorPickerType;
}

interface StateTypes {
  displayColorPicker: boolean;
  colorTitle: string;
  colorDescription: string;
}

class IconColorPicker extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.color = this.color.bind(this);
    this.buttonStyle = this.buttonStyle.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderFooter = this.renderFooter.bind(this);

    this.state = {
      colorDescription: Language.NO_DESCRIPTION,
      colorTitle: "",
      displayColorPicker: false
    };
  }

  public render() {
    const { type } = this.props;
    return (
      <>
        <div
          className={this.buttonStyle(type)}
          onClick={this.handleClick}
          style={{ backgroundColor: this.color() }}
        />
        {this.state.displayColorPicker ? (
          <div className="icon-color-picker-popover">
            <div className="icon-color-picker-swatch-container">
              {colors.map((NAVcolor, index) => (
                <IconColorPickerSwatch
                  key={index}
                  color={NAVcolor.color}
                  type={type}
                  handleHover={this.handleHover}
                />
              ))}
            </div>
            {this.renderFooter()}
          </div>
        ) : null}
      </>
    );
  }

  private color() {
    return this.props.type === ColorPickerType.FOREGROUND
      ? this.props.iconColor
      : this.props.iconBackgroundColor;
  }

  private buttonStyle(type: ColorPickerType | undefined) {
    return type === ColorPickerType.FOREGROUND
      ? "icon-color-picker-foreground" +
          (!this.props.iconColor ? " icon-color-picker-original" : "")
      : "icon-color-picker-background";
  }

  private renderFooter() {
    if (this.state.colorTitle) {
      return (
        <div className="icon-color-picker-popover-footer">
          {this.state.colorTitle}
          <hr />
          <p>{this.state.colorDescription}</p>
        </div>
      );
    }
    return null;
  }

  private handleHover = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const detailedColor = colors.filter(
      c => c.color === event.currentTarget.title
    )[0];

    this.setState({
      colorDescription: detailedColor.description,
      colorTitle: detailedColor.title
    });
  };

  private handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    });
  };

  private handleClose = () => {
    this.setState({
      colorDescription: Language.NO_DESCRIPTION,
      colorTitle: "",
      displayColorPicker: false
    });
  };
}

const mapStateToProps = (state: Store) => {
  return {
    iconBackgroundColor: state.iconsStore.iconBackgroundColor,
    iconColor: state.iconsStore.iconColor
  };
};

export default Redux.connect(mapStateToProps)(IconColorPicker);
