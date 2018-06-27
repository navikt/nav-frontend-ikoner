/* tslint:disable */
import {Input} from 'nav-frontend-skjema';
import * as React from 'react';
import {connect} from 'react-redux';
import api from "../../utils/api";
import './misc.less';

class SearchBar extends React.Component<{fetchIcons: any}, {searchText: any}> {

    constructor(props: any) {
        super(props)
        this.state = {
            searchText: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    public handleChange (e: any) {
        this.props.fetchIcons(e.target.value);
        this.setState({searchText: e.target.value});
    }

    public render() {
        return (
            <div className="icon-search-bar">
                <label className="search-bar-label"/>
                <Input label='Søk' value={this.state.searchText} onChange={
                    (event) => this.handleChange(event) } className="search-bar-input" />
                <div aria-live="assertive" role="alert"/>
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
    fetchIcons : (searchText:string)  => dispatch(api.fetchIcons(searchText))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);