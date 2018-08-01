import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { setIconBackgroundColor, setIconColor } from "../../../redux/actions";
import {
  IconColorAction,
  IconColorBackgroundAction
} from "../../../redux/actions-interfaces";
import { ColorPickerType, Store } from "../../../redux/store-interfaces";
import "./icon-color-picker-swatch.less";

interface PropTypes {
  color: string;
  setIconColor: (color: string) => IconColorAction;
  setIconBackgroundColor: (color: string) => IconColorBackgroundAction;
  handleHover: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: ColorPickerType;
  selectedIconColor: string;
  iconBackgroundColor: string;
}

class IconColorPickerSwatch extends React.Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    const { color, handleHover } = this.props;
    let className = "icon-color-picker-swatch ";

    if (color === "original") {
      className += " icon-color-picker-swatch-original";
    }

    if (this.isSelected()) {
      className += " icon-color-picker-swatch-selected";
    }

    return (
      <button
        title={color}
        className={className}
        style={{ backgroundColor: color }}
        onClick={this.handleClick}
        onMouseOver={handleHover}
      />
    );
  }

  private isSelected() {
    const { color, type, selectedIconColor, iconBackgroundColor } = this.props;
    return (
      (type === ColorPickerType.FOREGROUND &&
        (color === selectedIconColor ||
          (color === "original" && !selectedIconColor))) ||
      (type === ColorPickerType.BACKGROUND && color === iconBackgroundColor)
    );
  }
  private handleClick() {
    const { color, type } = this.props;
    type === ColorPickerType.FOREGROUND
      ? this.props.setIconColor(color)
      : this.props.setIconBackgroundColor(color);
  }
}

const mapStateToProps = (state: Store) => {
  return {
    iconBackgroundColor: state.iconsStore.iconBackgroundColor,
    selectedIconColor: state.iconsStore.iconColor
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setIconBackgroundColor: (color: string) =>
    dispatch(setIconBackgroundColor(color)),
  setIconColor: (color: string) => dispatch(setIconColor(color))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IconColorPickerSwatch);
