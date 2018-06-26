import * as React from 'react';
import {connect} from "react-redux";
import api from "../../utils/api";
import Icon from "../Misc/icon";
import './lists.less';

class IconList extends React.Component <{icons: any}, {}>{

    constructor(props: any){
        super(props);
        props.fetchIcons();
    }

    public render() {
        console.log(this.props.icons.list);
        if (this.props.icons.list){
            return (
                <div className="icon-list">
                    {this.props.icons.list.map((icon:any, index:any) =>
                        <Icon key={index} title={icon.filename} src={icon.link} />
                    )}
                </div>
            );
        }

        return null;
    }
}

const mapStateToProps = (state: any) => {
    return {
        icons: state.icons,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    fetchIcons : ()  => dispatch(api.fetchIcons())
});

export default connect(mapStateToProps, mapDispatchToProps)(IconList);