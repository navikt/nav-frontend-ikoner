/* tslint:disable */
import * as React from 'react';
import * as Redux from "react-redux";
import { WithContext as ReactTags } from 'react-tag-input';
import {IconStyle, Store} from "../../redux/store-interfaces";
import api from "../../utils/api";
import '../misc/misc.less';
import './tags.less';
import {resetIconFetch, setSearchText} from "../../redux/actions";

interface PropTypes { selectedIcon: any, insertTag: any, deleteTag: any, iconStyle: IconStyle};

class TagsHandler extends React.Component<PropTypes>{

    constructor(props: PropTypes){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    }

    handleAddition(tag : any) {
        this.props.insertTag(tag.text, this.props.selectedIcon.title, this.props.iconStyle)
    }

    handleDelete(position : any) {
        this.props.deleteTag(this.props.selectedIcon.tags[position].id, this.props.selectedIcon.title, this.props.iconStyle)
    }

    public render() {

        const {selectedIcon} = this.props;
        return (
           <div className="tags-container">
                        <ReactTags tags={selectedIcon.tags}
                                   suggestions={selectedIcon.tagsSuggestions}
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
        selectedIcon: state.iconsStore.selectedIcon,
        iconStyle: state.iconsStore.iconStyle,
    };
};

const mapDispatchToProps = (dispatch:Redux.Dispatch) => ({
    setSearchText : (searchText:string)  => { dispatch(setSearchText(searchText)); dispatch(resetIconFetch()) } ,
    insertTag : (tag: string, icon:string, style: IconStyle)  => api.insertTag(tag, icon, style)(dispatch),
    deleteTag : (id:string, icon: string,  style: IconStyle)  => api.deleteTag(id, icon, style)(dispatch)
});


export default Redux.connect(mapStateToProps, mapDispatchToProps)(TagsHandler);