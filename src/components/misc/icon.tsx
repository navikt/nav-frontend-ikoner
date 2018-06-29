/* tslint:disable */
import * as React from 'react';
import * as Redux from 'react-redux';
import {setSelectedIcon} from "../../redux/actions";
import {Icon as IIcon, Store} from '../../redux/store-interfaces';
import './misc.less';

interface PropTypes { icon:IIcon,  iconClass: string, iconContainerClass: string, iconShowDescription: boolean, iconColor: string, setSelectedIcon: typeof setSelectedIcon};

class Icon extends React.Component <PropTypes> {

    constructor(props: PropTypes){
        super(props);
        this.onIconClick = this.onIconClick.bind(this);
    }

    public onIconClick(){
        console.log("Clicked on " + this.props.icon.title);
        this.props.setSelectedIcon(this.props.icon);
    }

    public render() {

        const {icon, iconClass, iconContainerClass, iconShowDescription} = this.props;
        const style = {
            icon: {
                backgroundImage: `url(${icon.link})`,
            },
        }

        return (
            <div className={iconContainerClass}  onClick={this.onIconClick}>
                <div className={iconClass} style={style.icon} />
                {iconShowDescription && <div className="icon-description">
                    {icon.title}
                </div>
                }
            </div>
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

export default Redux.connect(mapStateToProps, mapDispatchToProps)(Icon);