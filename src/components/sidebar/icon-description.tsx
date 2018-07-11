/* tslint:disable */
import * as Redux from "react-redux";
import {IconStyle, Store} from "../../redux/store-interfaces";
import '../misc/misc.less';
import './tags.less';
import api from "../../utils/api";
import * as React from "react";
import {Textarea} from "../../../node_modules/nav-frontend-skjema";
import Language from "../../language/norwegian";

interface PropTypes { selectedIcon: any, editIcon: any, iconStyle: IconStyle};
interface StateTypes { tags: any; suggestions:any };

class IconDescription extends React.Component<PropTypes, StateTypes>{

    constructor(props: PropTypes) {
        super(props);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    public handleDescriptionChange(event: any) {
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
                <Textarea textareaClass="icon-description" placeholder={Language.ADD_DESCRIPTION} label={""} onChange={(event) => this.handleDescriptionChange(event)} value={selectedIcon.description} maxLength={100} />
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