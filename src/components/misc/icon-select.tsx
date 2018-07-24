import * as React from 'react';
import * as Redux from 'react-redux';
import {SelectedIconAction} from "../../redux/actions";
import {IconStyle, IconType, Store} from '../../redux/store-interfaces';
import api from "../../utils/api";
import Icon from "./icon";
import './misc.less';

interface PropTypes {
    id: string;
    title: string;
    imageLink: string;
    extension: string;
    iconStyle: IconStyle;
    key: number;
    fetchIcon: (filename: string, style: IconStyle) => Promise<SelectedIconAction>;
}

interface StateTypes {
    iconStyle: IconStyle;
    iconColor: string;
}

class IconSelect extends React.Component <PropTypes, StateTypes> {

    constructor(props: PropTypes) {
        super(props);
        this.onIconClick = this.onIconClick.bind(this);
    }

    public render() {
        return (
            <Icon
                key={this.props.key}
                imageLink={this.props.imageLink}
                extension={this.props.extension}
                iconType={IconType.IN_LIST}
                iconClickTrigger={this.onIconClick}
                iconColor="black"/>
        );
    }

    private onIconClick() {
        this.props.fetchIcon(this.props.id, this.props.iconStyle);
    }
}

const mapStateToProps = (state: Store) => {
    return {
        iconColor: state.iconsStore.iconColor,
        iconStyle: state.iconsStore.iconStyle,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
    fetchIcon: (filename: string, style: IconStyle) => api.fetchIcon(filename, style)(dispatch),
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconSelect);