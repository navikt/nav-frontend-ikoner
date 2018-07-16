/* tslint:disable */
import * as React from 'react';
import * as Redux from "react-redux";
import { WithContext as ReactTags } from 'react-tag-input';
import {IconExpanded, IconStyle, Store, Tag, Tags} from "../../redux/store-interfaces";
import api from "../../utils/api";
import '../misc/misc.less';
import './tags.less';
import {ReceiveTagsAction, setSearchText} from "../../redux/actions";

interface PropTypes {
    tags: Tags;
    selectedIcon: IconExpanded;
    insertTag: (tag: string, icon:string, style: IconStyle) => Promise<ReceiveTagsAction>;
    deleteTag: (id:string, icon: string,  style: IconStyle) => Promise<ReceiveTagsAction>;
    iconStyle: IconStyle;
};

class TagsHandler extends React.Component<PropTypes>{

    constructor(props: PropTypes){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.isTagUsed = this.isTagUsed.bind(this);
    }

    handleAddition(tag : Tag) {
        this.props.insertTag(tag.text, this.props.selectedIcon.title, this.props.iconStyle)
    }

    handleDelete(position : number) {
        const {selectedIcon, deleteTag, iconStyle} = this.props;
        if(selectedIcon.tags[position]) deleteTag(selectedIcon.tags[position].id, selectedIcon.title, iconStyle)
    }

    public isTagUsed(text:string){
        return this.props.selectedIcon.tags.filter((tag: Tag) => tag.text === text).length == 0;
    }


    public render() {
        const {selectedIcon,tags} = this.props;
        return (
           <div className="tags-container">
                <ReactTags tags={selectedIcon.tags}
                           suggestions={tags.filter((tag: Tag) => this.isTagUsed(tag.text))}
                           placeholder={'Legg til tagger'}
                           handleAddition={(tag) => this.handleAddition(tag)}
                           handleDelete={(position) => this.handleDelete(position)}
                />
           </div>
        );
    }
}

const mapStateToProps = (state: Store) => {
    return {
        tags: state.iconsStore.tags,
        selectedIcon: state.iconsStore.selectedIcon,
        iconStyle: state.iconsStore.iconStyle,
    };
};

const mapDispatchToProps = (dispatch:Redux.Dispatch) => ({
    setSearchText : (searchText:string)  => dispatch(setSearchText(searchText)),
    insertTag : (tag: string, icon:string, style: IconStyle)  => api.insertTag(tag, icon, style)(dispatch),
    deleteTag : (id:string, icon: string,  style: IconStyle)  => api.deleteTag(id, icon, style)(dispatch)
});


export default Redux.connect(mapStateToProps, mapDispatchToProps)(TagsHandler);