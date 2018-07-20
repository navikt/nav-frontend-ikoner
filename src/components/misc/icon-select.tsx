import * as React from 'react';
import * as Redux from 'react-redux';
import {SelectedIconAction} from "../../redux/actions";
import {IconBasic, IconStyle, Store} from '../../redux/store-interfaces';
import api from "../../utils/api";
import IconInList from "./icon-in-list";
import './misc.less';

interface PropTypes {
    icon: IconBasic,
    iconStyle: IconStyle;
    selected: boolean,
    setFocus: boolean,
    reference: React.RefObject<HTMLButtonElement>,
    fetchIcon: (filename:string, style: IconStyle) => Promise<SelectedIconAction>;
};

class IconSelect extends React.Component <PropTypes> {

    constructor(props: PropTypes){
        super(props);
        this.onIconClick = this.onIconClick.bind(this);
    }

    public onIconClick(){
        this.props.fetchIcon(this.props.icon.id, this.props.iconStyle);
    }

    public componentDidUpdate(){
        if(this.props.selected && this.props.setFocus && this.props.reference.current != null){
            this.props.reference.current.focus();
        }
    }

    public onFocus(event: React.FocusEvent<HTMLButtonElement>){
        console.log("FOCUS");
        event.preventDefault();
    }

    public render() {
        return(
            <button
                ref={this.props.selected ? this.props.reference : undefined}
                onFocus={this.onFocus}
                tabIndex={this.props.selected ? 0 : -1}
                onClick={this.onIconClick}
                className="icon-in-list-button" >
                <IconInList icon={this.props.icon} {...this.props} />
            </button>

        );

    }
}

const mapStateToProps = (state: Store) => {
    return {
        iconColor: state.iconsStore.iconColor,
        iconStyle: state.iconsStore.iconStyle,
    };
};

const mapDispatchToProps = (dispatch:Redux.Dispatch) => ({
    fetchIcon : (filename:string, style: IconStyle)  => api.fetchIcon(filename, style)(dispatch),
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconSelect);