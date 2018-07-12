/* tslint:disable */
import * as React from 'react';
import * as Redux from 'react-redux';
import {IconStyle, IconType, Store} from '../../redux/store-interfaces';
import './misc.less';
import Icon from "./icon";
import api from "../../utils/api";

interface PropTypes { id: string, title: string,imageLink: string, extension: string, iconStyle: IconStyle, key: number, fetchIcon: any};
interface StateTypes {iconStyle: IconStyle, iconColor: string}

class IconSelect extends React.Component <PropTypes,StateTypes> {

    constructor(props: PropTypes){
        super(props);
        this.onIconClick = this.onIconClick.bind(this);
    }

    public onIconClick(){
        this.props.fetchIcon(this.props.id, this.props.iconStyle);
    }

    public render() {
        return (
            <Icon key={this.props.key} imageLink={this.props.imageLink} extension={this.props.extension} iconType={IconType.IN_LIST} iconClickTrigger={this.onIconClick} iconColor="black"/>
        );
    }
}

const mapStateToProps = (state: Store) => {
    return {
        iconStyle: state.iconsStore.iconStyle,
        iconColor: state.iconsStore.iconColor
    };
};

const mapDispatchToProps = (dispatch:Redux.Dispatch) => ({
    fetchIcon : (filename:string, style: IconStyle)  => api.fetchIcon(filename, style)(dispatch),
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconSelect);