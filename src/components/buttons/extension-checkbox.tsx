import Checkbox from "nav-frontend-skjema/lib/checkbox";
import * as React from "react";

interface PropTypes {
    extension: string;
}
class ExtensionCheckbox extends React.Component <PropTypes> {

    public render() {

        return (
            <Checkbox label={this.props.extension}
                      id={this.props.extension}/>
        );
    }
}

export default ExtensionCheckbox;