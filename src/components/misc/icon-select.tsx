import * as React from 'react';
import {SelectedIconAction, SelectedIconIndexAction} from "../../redux/actions";
import {IconBasic, IconStyle} from '../../redux/store-interfaces';
import IconInList from "./icon-in-list";
import './misc.less';

interface PropTypes {
    index: number,
    key: number,
    icon: IconBasic,
    iconColor: string;
    iconStyle: IconStyle;
    selectedIconElement: React.RefObject<HTMLButtonElement>;
    fetchIcon: (filename:string, style: IconStyle) => Promise<SelectedIconAction>;
    setIconIndex: (index:number) => SelectedIconIndexAction;
    selectedIconIndex: number;
};

interface StateTypes {
    selected: boolean,
}

class IconSelect extends React.Component <PropTypes, StateTypes> {

    constructor(props: PropTypes){
        super(props);
        this.onIconClick = this.onIconClick.bind(this);
        this.state = {
            selected: props.index === props.selectedIconIndex,
        }
    }

    public onIconClick(){
        const {setIconIndex} = this.props;
        setIconIndex(this.props.index);
        this.props.fetchIcon(this.props.icon.id, this.props.iconStyle);
    }

    public shouldComponentUpdate(props: PropTypes, state: StateTypes) {
        return this.state.selected !== state.selected;
    }

    public componentWillReceiveProps(props: PropTypes){
        if(props.index === props.selectedIconIndex){
            this.setState({selected: true});
        }else if(this.state.selected){
            this.setState({selected: false});
        }
    }

    public render() {
        return(
            <button
                tabIndex={this.state.selected ? 0 : -1}
                onClick={this.onIconClick}
                className="icon-in-list-button">
                <IconInList selected={this.state.selected} {...this.props} />
            </button>

        );
    }

}

export default IconSelect;