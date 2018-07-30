import * as React from "react";
import { ChromePicker, ColorResult } from "react-color";
import { connect, Dispatch } from "react-redux";
import Language from "../../language/norwegian";
import { setIconBackgroundColor, setIconColor } from "../../redux/actions";
import {
  IconColorAction,
  IconColorBackgroundAction
} from "../../redux/actions-interfaces";
import { ColorPickerType, Store } from "../../redux/store-interfaces";

interface PropTypes {
  type: ColorPickerType | undefined;
  setIconColor: (color: string) => IconColorAction;
  setIconBackgroundColor: (color: string) => IconColorBackgroundAction;
  selectedIconColor: string;
  iconBackgroundColor: string;
}

interface StateTypes {
  displayColorPicker: boolean;
}

class IconColorPickerInput extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      displayColorPicker: false
    };
  }

  public render() {
    const { type, selectedIconColor, iconBackgroundColor } = this.props;
    return (
      <>
        <button
          className="knapp knapp--hoved knapp--mini icon-color-picker-button"
          onClick={this.handleClick}
        >
          {!this.state.displayColorPicker
            ? Language.PICK_COLOR
            : Language.PICK_COLOR_CLOSE}
        </button>
        {this.state.displayColorPicker ? (
          <ChromePicker
            disableAlpha={true}
            color={
              type === ColorPickerType.FOREGROUND
                ? selectedIconColor
                : iconBackgroundColor
            }
            onChange={this.handleChange}
          />
        ) : null}
      </>
    );
  }

  private handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    });
  };

  /*
  private handleClose = () => {
    this.setState({
      displayColorPicker: false
    });
  };
  */

  private handleChange(color: ColorResult) {
    const { type } = this.props;
    type === ColorPickerType.FOREGROUND
      ? this.props.setIconColor(color.hex)
      : this.props.setIconBackgroundColor(color.hex);
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
)(IconColorPickerInput);
