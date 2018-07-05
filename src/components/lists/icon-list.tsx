import * as React from 'react';
import * as Redux from "react-redux";
import {Icon as IIcon, Icons, IconStyle, SearchText, Store} from "../../redux/store-interfaces";
import api from "../../utils/api";
import IconSelect from '../misc/icon-select';
import './lists.less';

interface PropTypes { iconStyle: IconStyle, icons: Icons, searchText: SearchText, fetchIcons: typeof api.fetchIcons}

class IconList extends React.Component <PropTypes>{

    constructor(props: any){
        super(props);
        props.fetchIcons(props.iconStyle);
    }

    public componentWillReceiveProps(props: PropTypes){
        if (this.props.searchText !== props.searchText || this.props.iconStyle !== props.iconStyle) {
            props.fetchIcons(props.iconStyle, props.searchText);
        }
    }

    public render() {
        return (
            <div className="icon-list">
                {this.props.icons.map((icon:IIcon, index: number) =>
                    <IconSelect key={index} icon={icon} />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: Store) => {
    return {
        iconStyle: state.iconsStore.iconStyle,
        icons: state.iconsStore.icons,
        searchText: state.iconsStore.searchText,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
    fetchIcons : ( iconStyle: IconStyle, searchText:string)  => api.fetchIcons(iconStyle, searchText)(dispatch),
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconList);