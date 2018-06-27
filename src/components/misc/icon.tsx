// import * as PropTypes from 'prop-types';
import * as React from 'react';
// import api from '../../utils/api';
import './misc.less';


interface IconProps { src: string; title: string };

class Icon extends React.Component <{src: any, title: any}> {

    public props: IconProps;
    public render() {

        const style = {
            icon: {
                backgroundImage: `url(${this.props.src})`,
            }
        }

        return (
            <div className="iconContainer">
                <div className="icon" style={style.icon} />
                <div className="icon-description">
                    <p>{this.props.title}</p>
                </div>
            </div>
        );
    }
}

export default Icon;