/* tslint:disable */
import * as Redux from "react-redux";
import TagsHandler from './tags-handler';
import {IconStyle, IconType, Store} from "../../redux/store-interfaces";
import DownloadButton from "../buttons/download-button";
import Icon from './icon';
import './misc.less';
import './tags.less';
import Seperator from "./seperator";
import api from "../../utils/api";
import * as React from "react";

interface PropTypes { selectedIcon: any, editIcon: any, iconStyle: IconStyle};
interface StateTypes { tags: any; suggestions:any };

class InformationPanel extends React.Component<PropTypes, StateTypes>{

    constructor(props: PropTypes) {
        super(props);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    public handleTitleChange(title: string) {
        this.props.editIcon(this.props.selectedIcon.id, title, this.props.selectedIcon.description, this.props.iconStyle);
    }

    public handleDescriptionChange(description: string) {
        this.props.editIcon(this.props.selectedIcon.id, this.props.selectedIcon.title, description, this.props.iconStyle);
    }

    public render() {

        const {selectedIcon} = this.props;
        if(!selectedIcon){
            return (
                <div className="icon-side-panel" />
            );
        }

        return (
            <div className="icon-side-panel">
                <div className="icon-side-panel-content">
                    <div className="icon-side-panel-heading">
                        <input className="icon-title" value={selectedIcon.title}  onChange={
                            (event) => this.handleTitleChange(event.target.value)}/>
                    </div>
                    <input className="icon-description" value={selectedIcon.description} onChange={
                        (event) => this.handleDescriptionChange(event.target.value)}/>
                    <Icon imageLink={selectedIcon.bestLocation.url} extension={selectedIcon.bestLocation.extension} iconType={IconType.IN_PANEL} iconColor="black"/>
                    <TagsHandler />
                    <Seperator/>
                    <DownloadButton icon={selectedIcon}/>
                </div>
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


export default Redux.connect(mapStateToProps, mapDispatchToProps)(InformationPanel);