import * as React from 'react';
import { connect } from 'react-redux';
import {IconBasic, Store} from '../../redux/store-interfaces';
import IconInList from "./icon-in-list";
import './misc.less';

interface PropTypes {
    index: number;
    onClick: () => void;
    icon: IconBasic;
}

class IconSelect extends React.PureComponent<PropTypes & { selected: boolean }, {}> {
    public render() {
        return(
            <button
                tabIndex={this.props.selected ? 0 : -1}
                onClick={this.props.onClick}
                className="icon-in-list-button">
                <IconInList selected={this.props.selected!} {...this.props} />
            </button>

        );
    }
}

const mapStateToProps = (state: Store, props: PropTypes) => ({
    selected: state.iconsStore.selectedIconIndex === props.index
});

export default connect(mapStateToProps)(IconSelect);