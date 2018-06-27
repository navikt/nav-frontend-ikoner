import * as React from 'react';
import {connect} from "react-redux";
import api from "../../utils/api";
import Icon from "../misc/icon";
import './lists.less';

class IconList extends React.Component <{icons: any}, {}>{

    constructor(props: any){
        super(props);
        props.fetchIcons();
    }

    public render() {
        return (
            <div className="icon-list">
                {this.props.icons.map((icon:any, index:any) =>
                    <Icon key={index} title={icon.title} src={icon.link} />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        icons: state.iconsStore.icons,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    fetchIcons : ()  => dispatch(api.fetchIcons())
});

export default connect(mapStateToProps, mapDispatchToProps)(IconList);