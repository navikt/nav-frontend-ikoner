/* tslint:disable */
import * as React from 'react';
import * as Redux from 'react-redux';
import {setSelectedIcon} from "../../redux/actions";
import {Icon as IIcon} from '../../redux/store-interfaces';
import './misc.less';

interface PropTypes { icon:IIcon, columnWidth: number, space: number, setSelectedIcon: typeof setSelectedIcon };

class Icon extends React.Component <PropTypes> {

    public render() {

        const style = {
            icon: {
                backgroundImage: `url(${this.props.icon.link})`,
            },
            iconContainer:{
                padding: this.props.space,
                width: this.props.columnWidth
            }
        }

        return (
            <div style={style.iconContainer}  onClick={(event) => this.props.setSelectedIcon(this.props.icon)}>
                <div className="icon" style={style.icon} />
                <div className="icon-description">
                    <p>{this.props.icon.title}</p>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = () => ({
    setSelectedIcon : (icon:IIcon)  => setSelectedIcon(icon),
});

export default Redux.connect(mapDispatchToProps)(Icon);