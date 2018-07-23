import * as React from 'react';
import {SelectedIconAction, SelectedIconIndexAction} from "../../redux/actions";
import {IconBasic, Icons, IconStyle} from '../../redux/store-interfaces';
import IconInList from "./icon-in-list";
import './misc.less';

interface PropTypes {
    index: number,
    key: number,
    icon: IconBasic,
    iconColor: string;
    iconStyle: IconStyle;
    icons: Icons;
    fetchIcon: (filename:string, style: IconStyle) => Promise<SelectedIconAction>;
    setIconIndex: (index:number) => SelectedIconIndexAction;
    selectedIconIndex: number;
};

interface StateTypes {
    selected: boolean,
}

class IconSelect extends React.Component <PropTypes, StateTypes> {

    private buttonElement : React.RefObject<HTMLButtonElement>;

    constructor(props: PropTypes){
        super(props);
        this.buttonElement = React.createRef();
        this.onIconClick = this.onIconClick.bind(this);
        this.state = {
            selected: props.index === props.selectedIconIndex,
        }
    }

    public onIconClick(){
        const {icons, icon, setIconIndex} = this.props;
        icons.forEach((otherIcon, index) => {
            if(icon.id === otherIcon.id){
                setIconIndex(index);
            }
        });

        this.props.fetchIcon(this.props.icon.id, this.props.iconStyle);
    }

    public shouldComponentUpdate(props: PropTypes) {
        return props.index === props.selectedIconIndex || this.state.selected;
    }

    public componentWillReceiveProps(props: PropTypes){
        if(props.index === props.selectedIconIndex){
            this.setState({selected: true});
            this.focusIcon();
        }else if(this.state.selected){
            this.setState({selected: false});
        }
    }

    public render() {
        return(
            <button
                ref={this.buttonElement}
                tabIndex={this.state.selected ? 0 : -1}
                onClick={this.onIconClick}
                className="icon-in-list-button">
                <IconInList selected={this.state.selected} {...this.props} />
            </button>

        );
    }

    private focusIcon(){
        if(this.buttonElement.current != null){
            this.buttonElement.current.focus();
        }
    }
}

export default IconSelect;