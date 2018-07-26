import * as React from "react";
import TextareaAutosize from 'react-autosize-textarea';
import * as Redux from "react-redux";
import {AnyAction} from 'redux';
import {ThunkDispatch} from "redux-thunk";
import {editIcon} from "../../redux/actions";
import {IconExpanded, IconStyle, Store, Tags} from "../../redux/store-interfaces";
import '../misc/misc.less';
import './icon-title.less';
import './tags.less';

interface PropTypes {
    selectedIcon: IconExpanded;
    editIcon:  ( id: string, title: string, description: string) => Promise<any>;
    iconStyle: IconStyle;
}

interface StateTypes {
    tags: Tags;
    suggestions: Tags;
}

class IconTitle extends React.Component<PropTypes, StateTypes> {

    constructor(props: PropTypes) {
        super(props);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    public render() {

        const {selectedIcon} = this.props;
        if (!selectedIcon) {
            return (
                <div className="icon-side-panel"/>
            );
        }

        return (
            <div className="icon-title-container">
                <TextareaAutosize
                    className="icon-title"
                    value={selectedIcon.title}
                    onChange={this.handleTitleChange}
                />
            </div>
        );
    }

    private handleTitleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.props.editIcon(this.props.selectedIcon.id, event.target.value, this.props.selectedIcon.description);
    }
}

const mapStateToProps = (state: Store) => {
    return {
        iconStyle: state.iconsStore.iconStyle,
        selectedIcon: state.iconsStore.selectedIcon
    };
};

const mapDispatchToProps = (dispatch:ThunkDispatch<Store, {}, AnyAction>) => ({
    editIcon : ( id: string, title: string, description: string, style: IconStyle)  => dispatch(editIcon(id, title, description))
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconTitle);