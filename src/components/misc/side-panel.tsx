import * as React from 'react';
import * as Redux from "react-redux";
import {Icon, Store} from "../../redux/store-interfaces";
import './misc.less';

interface PropTypes { selectedIcon: Icon };

class SidePanel extends React.Component<PropTypes>{

    public render() {

        const {selectedIcon} = this.props;
        if(selectedIcon == null){
            return (
                <div className="icon-side-panel">
                    <h2>Ikke selektert</h2>
                </div>
            );
        }
        return (
            <div className="icon-side-panel">
                <h2>{selectedIcon.title}</h2>
            </div>
        );
    }
}

const mapStateToProps = (state: Store) => {
    return {
        selectedIcon: state.iconsStore.selectedIcon,
    };
};

export default Redux.connect(mapStateToProps)(SidePanel);