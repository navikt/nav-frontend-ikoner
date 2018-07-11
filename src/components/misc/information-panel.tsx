/* tslint:disable */
import * as React from 'react';
import * as Redux from 'react-redux';
import { setIconTitleDescription} from "../../redux/actions";
import {Icon as IIcon, IconType, Store} from "../../redux/store-interfaces";
import DownloadButton from "../buttons/download-button";
import Icon from './icon';
import './misc.less';
import api from "../../utils/api";


interface PropTypes { selectedIcon: IIcon, setIconTitleDescription: typeof setIconTitleDescription, editIcon: typeof api.editIcon};

class InformationPanel extends React.Component<PropTypes>{

    constructor(props: PropTypes) {
        super(props);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    public handleTitleChange(title: string) {
        this.props.setIconTitleDescription(title, this.props.selectedIcon.description);
        console.log(this.props.selectedIcon.filename + " got new title: " + this.props.selectedIcon.title + "(=" + title + ")");
    }

    public handleDescriptionChange(description: string) {
        this.props.setIconTitleDescription(this.props.selectedIcon.title, description);
        console.log(this.props.selectedIcon.filename + " got new description: " + this.props.selectedIcon.description + "(=" + description + ")");
    }

    componentDidUpdate() {
        api.editIcon(this.props.selectedIcon.filename, this.props.selectedIcon.title, this.props.selectedIcon.description)
    }

    public render() {

        const {selectedIcon} = this.props;
        if(!selectedIcon){
            return (
                <div className="icon-side-panel" />
            );
        }

        console.log(selectedIcon.filename + " " + selectedIcon.title);
        return (
            <div className="icon-side-panel">
                <div className="icon-side-panel-content">
                    <div className="icon-side-panel-heading">
                        <h2>{selectedIcon.title}</h2>
                        <input className="icon-title" value={selectedIcon.title} onChange={
                            (event) => this.handleTitleChange(event.target.value)}/>
                    </div>
                    <Icon icon={selectedIcon} iconType={IconType.IN_PANEL} iconColor="black"/>
                    <input className="icon-description" value={selectedIcon.description} onChange={
                        (event) => this.handleDescriptionChange(event.target.value)}/>
                    <DownloadButton icon={selectedIcon}/>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state: Store) => {
    return {
        selectedIcon: state.iconsStore.selectedIcon,
    };
};

const mapDispatchToProps = (dispatch:Redux.Dispatch) => ({
    editIcon : ( filename: string, title: string, description: string)  => { api.editIcon(filename, title, description)(dispatch); },
    setIconTitleDescription : (title:string, description:string)  => { dispatch(setIconTitleDescription(title, description)); }
});


export default Redux.connect(mapStateToProps, mapDispatchToProps)(InformationPanel);