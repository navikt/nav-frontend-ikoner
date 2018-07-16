import * as React from "react";
import * as Redux from "react-redux";
import {Input} from "../../../node_modules/nav-frontend-skjema";
import {IconExpanded, IconStyle, Store, Tags} from "../../redux/store-interfaces";
import api from "../../utils/api";
import '../misc/misc.less';
import './tags.less';

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

    public render() {

        const {selectedIcon} = this.props;
        if(!selectedIcon){
            return (
                <div className="icon-side-panel" />
            );
        }

        return (
            <div className="icon-title-container">
                <Input inputClassName="icon-title" label="" value={selectedIcon.title}
                       onChange={this.handleTitleChange}/>
            </div>
        );
    }

    private handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.editIcon(this.props.selectedIcon.id, event.target.value, this.props.selectedIcon.description, this.props.iconStyle);
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