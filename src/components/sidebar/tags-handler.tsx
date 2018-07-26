import * as React from 'react';
import * as Redux from "react-redux";
import { WithContext as ReactTags } from 'react-tag-input';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {deleteTag, insertTag, setSearchText} from "../../redux/actions";
import {ReceiveTagsAction} from "../../redux/actions-interfaces";
import {IconExpanded, IconStyle, Store, Tag, Tags} from "../../redux/store-interfaces";
import '../misc/misc.less';
import './tags.less';

interface PropTypes {
    tags: Tags;
    selectedIcon: IconExpanded;
    insertTag: (tag: string, icon:string) => Promise<ReceiveTagsAction>;
    deleteTag: (id:string, icon: string) => Promise<ReceiveTagsAction>;
    iconStyle: IconStyle;
}

class TagsHandler extends React.Component<PropTypes> {

    constructor(props: PropTypes) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.isTagUsed = this.isTagUsed.bind(this);
    }

    public render() {
        const {selectedIcon, tags} = this.props;
        return (
            <div className="tags-container">
                <ReactTags tags={selectedIcon.tags}
                           suggestions={tags.filter((tag: Tag) => this.isTagUsed(tag.text))}
                           placeholder={'Legg til tagger'}
                           autofocus={false}
                           handleAddition={this.handleAddition}
                           handleDelete={this.handleDelete}
                />
            </div>
        );
    }

    private handleAddition(tag : Tag) {
        this.props.insertTag(tag.text, this.props.selectedIcon.title)
    }

    private handleDelete(position : number) {
        const {selectedIcon} = this.props;
        if(selectedIcon.tags[position]) {
            this.props.deleteTag(selectedIcon.tags[position].id, selectedIcon.title)
        }
    }

    private isTagUsed(text: string) {
        return this.props.selectedIcon.tags.filter((tag: Tag) => tag.text === text).length === 0;
    }
}

const mapStateToProps = (state: Store) => {
    return {
        iconStyle: state.iconsStore.iconStyle,
        selectedIcon: state.iconsStore.selectedIcon,
        tags: state.iconsStore.tags
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, {}, AnyAction>) => ({
    deleteTag : (id:string, icon: string)  => dispatch(deleteTag(id, icon)),
    insertTag : (tag: string, icon:string)  => dispatch(insertTag(tag, icon)),
    setSearchText : (searchText:string)  => dispatch(setSearchText(searchText))
});


export default Redux.connect(mapStateToProps, mapDispatchToProps)(TagsHandler);