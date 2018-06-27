import * as React from 'react';
import './misc.less';

interface PropTypes { src: string, title: string, columnWidth: number, space: number  };

class Icon extends React.Component <PropTypes> {

    public render() {

        const style = {
            icon: {
                backgroundImage: `url(${this.props.src})`,
            },
            iconContainer:{
                padding: this.props.space,
                width: this.props.columnWidth
            }
        }

        return (
            <div style={style.iconContainer}>
                <div className="icon" style={style.icon} />
                <div className="icon-description">
                    <p>{this.props.title}</p>
                </div>
            </div>
        );
    }
}

export default Icon;