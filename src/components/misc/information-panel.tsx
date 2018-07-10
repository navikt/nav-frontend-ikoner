/* tslint:disable */
import * as React from 'react';
import * as Redux from "react-redux";
import { WithContext as ReactTags } from 'react-tag-input';
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
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    }

    handleDelete(id : any) {
        console.log("Deleted " + id);
    }

    handleAddition(tag : any) {
        console.log("Added" + tag);
    }


    componentWillReceiveProps(props: any){
        console.log(props.selectedIcon);
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
                    <div className="tags-container">
                        <ReactTags tags={selectedIcon.tags}
                                   suggestions={selectedIcon.tagsSuggestions}
                                   placeholder={'Legg til tagger'}
                                   handleDelete={(tag) => this.handleDelete(tag)}
                                   handleAddition={(tag) => this.handleDelete(tag)}
                        />
                    </div>
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