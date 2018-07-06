/* tslint:disable */
import * as React from 'react';
import * as Redux from 'react-redux';
import {setSelectedIcon} from "../../redux/actions";
import {Icon as IIcon, IconType, Store} from '../../redux/store-interfaces';
import './misc.less';
import Icon from "./icon";

interface PropTypes { icon:IIcon, key: number, setSelectedIcon: typeof setSelectedIcon};

class IconSelect extends React.Component <PropTypes> {

    constructor(props: PropTypes){
        super(props);
        this.onIconClick = this.onIconClick.bind(this);
    }

    public onIconClick(){
        console.log("Clicked on " + this.props.icon.title);
        this.props.setSelectedIcon(this.props.icon);
    }

    public render() {
        return (
            <Icon key={this.props.key} icon={this.props.icon} iconType={IconType.IN_LIST} iconClickTrigger={this.onIconClick} iconColor="black"/>
        );
    }
}

const mapStateToProps = (state: Store) => {
    return {
        iconColor: state.iconsStore.iconColor,
    };
};

const mapDispatchToProps = (dispatch:Redux.Dispatch) => ({
    setSelectedIcon : (icon:IIcon)  => dispatch(setSelectedIcon(icon)),
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconSelect);