import * as React from 'react';
import {connect} from 'react-redux';
import {IconBasic, Store} from '../../redux/store-interfaces';
import IconInList from "./icon-in-list";
import './misc.less';

interface PropTypes {
    index: number;
    onClick: () => void;
    icon: IconBasic;
}

function IconSelect(props: PropTypes & { selected: boolean }) {
    return (
        <button
            tabIndex={props.selected ? 0 : -1}
            onClick={props.onClick}
            className="icon-in-list-button">
            <IconInList selected={props.selected!} {...props} />
        </button>
    );
}

const mapStateToProps = (state: Store, props: PropTypes) => ({
    selected: state.iconsStore.selectedIconIndex === props.index
});

export default connect(mapStateToProps)(IconSelect);