/* tslint:disable */
import * as React from 'react';
import * as Redux from "react-redux";
import TagsHandler from './tags-handler';
import {IconType, Store} from "../../redux/store-interfaces";
import DownloadButton from "../buttons/download-button";
import Icon from './icon';
import './misc.less';
import './tags.less';
import Seperator from "./seperator";

interface PropTypes { selectedIcon: any };
interface StateTypes { tags: any; suggestions:any };

class InformationPanel extends React.Component<PropTypes, StateTypes>{

    constructor(props: PropTypes){
        super(props);
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
                    </div>
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
        selectedIcon: state.iconsStore.selectedIcon,
    };
};

export default Redux.connect(mapStateToProps)(InformationPanel);