import * as React from "react";
// import {iconCDNAbsolute} from "../../utils/api-link-creator";
import * as Modal from "react-modal";
import * as Redux from "react-redux";
import { getChosenExtensions } from "../../redux/selectors";
import { IconExpanded, IconStyle, Store } from "../../redux/store-interfaces";
import "../buttons/buttons.less";

interface PropTypes {
  icon: IconExpanded;
  chosenExtensions: string[];
  iconStyle: IconStyle;
  iconColor: string;
}
/*
function findUniqueExtensions(icon: IconExpanded, style: IconStyle) {
    const stylePath = (style === IconStyle.FILLED ? Language.FILLED_ICON : Language.LINE_ICON).toLowerCase();
    const locations = icon.locations
        .filter((location) => location.path.toLowerCase().includes(stylePath))
        .map((location) => location.extension);

    return Array.from(new Set(locations));
}*/
/*
function getLocations(icon: IconExpanded, style: IconStyle) {
    const stylePath = (style === IconStyle.FILLED ? Language.FILLED_ICON : Language.LINE_ICON).toLowerCase();

    const locations = icon.locations
        .filter((location) => location.path.toLowerCase().includes(stylePath))
        .map(location) =>
}*/

interface StateTypes {
  modalIsOpen: boolean;
}

class CdnModal extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes, state: StateTypes) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  public openModal() {
    this.setState({ modalIsOpen: true });
  }

  public afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  public closeModal() {
    this.setState({ modalIsOpen: false });
  }

  public render() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          // style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={undefined}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
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

export default Redux.connect(mapStateToProps)(CdnModal);
