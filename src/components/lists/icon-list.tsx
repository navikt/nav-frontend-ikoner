import * as React from 'react';
import {connect} from "react-redux";
import api from "../../utils/api";
import Icon from "../misc/icon";
import './lists.less';

class IconList extends React.Component <{icons: any, searchText: any}, {}>{

    constructor(props: any){
        super(props);
        props.fetchIcons();
    }

    public componentWillReceiveProps(props:any){
        if (this.props.searchText !== props.searchText) {
            props.fetchIcons(props.searchText);
        }
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
        searchText: state.iconsStore.searchText,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    fetchIcons : (searchText:string)  => dispatch(api.fetchIcons(searchText)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IconList);