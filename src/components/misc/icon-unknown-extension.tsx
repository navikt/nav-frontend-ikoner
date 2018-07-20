import * as React from 'react';
import './misc.less';

interface PropTypes {
    extension: string
};

class IconUnknownExtension extends React.Component <PropTypes>{

    constructor(props:PropTypes){
        super(props);
    }
    public render() {

        const {extension} = this.props;
        if(extension !== "svg" && extension !== "png"){
            return (
                <div className="unknown-extension-container">
                    <div className="unknown-extension">
                        {extension.toLocaleUpperCase()}
                    </div>
                </div>
            );
        }
       return null;
    }
}

export default IconUnknownExtension;