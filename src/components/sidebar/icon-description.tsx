import * as React from "react";
import * as Redux from "react-redux";
import {Textarea} from "../../../node_modules/nav-frontend-skjema";
import Language from "../../language/norwegian";
import {SelectedIconAction} from "../../redux/actions";
import {IconExpanded, IconStyle, Store, Tags} from "../../redux/store-interfaces";
import api from "../../utils/api";
import '../misc/misc.less';
import './icon-title.less';

interface PropTypes {
    selectedIcon: IconExpanded,
    editIcon:  ( id: string, title: string, description: string, style: IconStyle) => Promise<SelectedIconAction>,
    iconStyle: IconStyle
};
interface StateTypes { tags: Tags; suggestions: Tags };

class IconDescription extends React.Component<PropTypes, StateTypes>{

    constructor(props: PropTypes) {
        super(props);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    public handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.editIcon(this.props.selectedIcon.id, this.props.selectedIcon.title, event.target.value, this.props.iconStyle);
    }

    public render() {

        const {selectedIcon} = this.props;
        if(!selectedIcon){
            return (
                <div className="icon-side-panel" />
            );
        }

        return (
            <div className="icon-description-container">
                <Textarea
                    textareaClass="icon-description"
                    placeholder={Language.ADD_DESCRIPTION}
                    label={""}
                    onChange={this.handleDescriptionChange}
                    value={selectedIcon.description}
                    maxLength={100} />
            </div>
        );
    }
}


const mapStateToProps = (state: Store) => {
    return {
        iconStyle: state.iconsStore.iconStyle,
        selectedIcon: state.iconsStore.selectedIcon,
    };
};

const mapDispatchToProps = (dispatch:Redux.Dispatch) => ({
    editIcon : ( id: string, title: string, description: string, style: IconStyle)  => api.editIcon(id, title, description, style)(dispatch)
});


export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconDescription);