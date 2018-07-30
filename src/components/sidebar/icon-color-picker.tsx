import * as React from "react";
import * as Redux from "react-redux";
import Language from "../../language/norwegian";
import { ColorPickerType, Store } from "../../redux/store-interfaces";
import { colors } from "../../utils/colors";
import "../misc/misc.less";
import IconColorPickerInput from "./icon-color-picker-input";
import IconColorPickerSwatch from "./icon-color-picker-swatch";
import "./icon-color-picker.less";
import "./tags.less";

interface PropTypes {
  iconColor: string;
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
    this.keyPress = this.keyPress.bind(this);
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
        <button
          className={this.buttonStyle(type)}
          onClick={this.handleClick}
          style={{ backgroundColor: this.color() }}
        />
        {this.state.displayColorPicker ? (
          <>
            <div
              className="icon-color-picker-cover"
              onClick={this.handleClose}
            />
            <div className="icon-color-picker-popover">
              <div
                className="icon-color-picker-swatch-container"
                onKeyDown={this.keyPress}
              >
                {colors.map((NAVcolor, index) => (
                  <IconColorPickerSwatch
                    key={index}
                    color={NAVcolor.color}
                    type={type}
                    handleHover={this.handleHover}
                  />
                ))}
                <IconColorPickerInput type={type} />
              </div>
              {this.renderFooter()}
            </div>
          </>
        ) : null}
      </>
    );
  }

  private keyPress(event: React.KeyboardEvent<HTMLDivElement>) {
    console.log(event.key);
    if (event.key === "Escape") {
      this.handleClose();
    }
  }

  private color() {
    const { type, iconColor, iconBackgroundColor } = this.props;
    return type === ColorPickerType.FOREGROUND
      ? iconColor !== "original"
        ? iconColor
        : "white"
      : iconBackgroundColor !== "original"
        ? iconBackgroundColor
        : "white";
  }

  private buttonStyle(type: ColorPickerType | undefined) {
    return type === ColorPickerType.FOREGROUND
      ? "icon-color-picker-foreground" +
          (this.props.iconColor === "original"
            ? " icon-color-picker-original"
            : "")
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

  private handleHover = (event: React.MouseEvent<HTMLButtonElement>) => {
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
