// import * as PropTypes from 'prop-types';
import * as React from 'react';
// import api from '../../utils/api';
import './misc.less';


interface IconProps { src: string; title: string };

class Icon extends React.Component <{src: any, title: any}> {

    public props: IconProps;

    public render() {
        return (
            <div className="icon">
                <img src={this.props.src} className="icon-image"/>
                <p>{this.props.title}</p>
            </div>
        );
    }
}

export default Icon;