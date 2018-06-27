import * as React from 'react';
import './misc.less';

interface PropTypes { src: string; title: string };

class Icon extends React.Component <PropTypes> {

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