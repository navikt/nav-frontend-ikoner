import * as React from 'react';
import * as Redux from 'react-redux';
import { setIconTitleDescripion } from "../../redux/actions";
import {Icon as IIcon, IconType, Store} from "../../redux/store-interfaces";
import DownloadButton from "../buttons/download-button";
import Icon from './icon';
import './misc.less';


interface PropTypes { selectedIcon: IIcon, title: string, description: string, setIconTitleDescription: typeof setIconTitleDescripion};

class InformationPanel extends React.Component<PropTypes>{

    constructor(props: PropTypes) {
        super(props)
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    public handleTitleChange(newTitle: string) {
        this.props.setIconTitleDescription(newTitle, " ")
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
                        <h2>{selectedIcon.title}</h2>
                        <input className="icon-title" value={selectedIcon.title} onChange={
                            (event) => this.handleTitleChange(event.target.value)}/>
                    </div>
                    <Icon icon={selectedIcon} iconType={IconType.IN_PANEL} iconColor="black"/>
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
    setIconTitleDescription : (title:string, description:string)  => { dispatch(setIconTitleDescription(title, description)); }
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(InformationPanel);