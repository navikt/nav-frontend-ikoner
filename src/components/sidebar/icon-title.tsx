/* tslint:disable */
import * as Redux from "react-redux";
import {IconExpanded, IconStyle, Store, Tags} from "../../redux/store-interfaces";
import '../misc/misc.less';
import './tags.less';
import api from "../../utils/api";
import * as React from "react";
import {Input} from "../../../node_modules/nav-frontend-skjema";

interface PropTypes {
    selectedIcon: IconExpanded,
    editIcon:  ( id: string, title: string, description: string, style: IconStyle) => Promise<any>,
    iconStyle: IconStyle
};
interface StateTypes { tags: Tags; suggestions: Tags };

class IconTitle extends React.Component<PropTypes, StateTypes>{

    constructor(props: PropTypes) {
        super(props);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    public handleTitleChange(title: string) {
        this.props.editIcon(this.props.selectedIcon.id, title, this.props.selectedIcon.description, this.props.iconStyle);
    }

    public render() {

        const {selectedIcon} = this.props;
        if(!selectedIcon){
            return (
                <div className="icon-side-panel" />
            );
        }

        return (
            <div className="icon-title-container">
                <Input inputClassName="icon-title" label="" value={selectedIcon.title} onChange={
                (event) => this.handleTitleChange(event.target.value)}/>
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


export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconTitle);