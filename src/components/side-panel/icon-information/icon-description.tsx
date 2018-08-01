import * as React from "react";
import * as Redux from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Textarea } from "../../../../node_modules/nav-frontend-skjema/lib/index";
import Language from "../../../language/norwegian";
import { editIcon } from "../../../redux/actions";
import { SelectedIconAction } from "../../../redux/actions-interfaces";
import {
  IconExpanded,
  IconStyle,
  Store
} from "../../../redux/store-interfaces";
import "./icon-description.less";

interface PropTypes {
  selectedIcon: IconExpanded;
  editIcon: (
    id: string,
    title: string,
    description: string
  ) => Promise<SelectedIconAction>;
  iconStyle: IconStyle;
}

class IconDescription extends React.Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  public render() {
    const { selectedIcon } = this.props;
    if (!selectedIcon) {
      return <div className="icon-side-panel" />;
    }

    return (
      <div className="icon-description-container">
        <Textarea
          textareaClass="icon-description"
          placeholder={Language.ADD_DESCRIPTION}
          label={""}
          onChange={this.handleDescriptionChange}
          value={selectedIcon.description}
          maxLength={100}
        />
      </div>
    );
  }

  private handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.editIcon(
      this.props.selectedIcon.id,
      this.props.selectedIcon.title,
      event.target.value
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    iconStyle: state.iconsStore.iconStyle,
    selectedIcon: state.iconsStore.selectedIcon
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, {}, AnyAction>) => ({
  editIcon: (id: string, title: string, description: string) =>
    dispatch(editIcon(id, title, description))
});

export default Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(IconDescription);
