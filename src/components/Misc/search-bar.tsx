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
        this.setState({searchText: e.target.value});
        this.props.fetchIcons(this.state.searchText);
    }

    public render() {
        return (
            <div className="row">
                <div className="search-bar">
                    <label className="search-bar-label"/>
                    <Input label='Inputfelt-label' value={this.state.searchText} onChange={ (event) => this.handleChange(event) } className="search-bar-input" />
                    <div aria-live="assertive" role="alert"/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        icons: state.icons,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    fetchIcons : (searchText:string)  => dispatch(api.fetchIcons(searchText))
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);