/* tslint:disable */
import {Input} from 'nav-frontend-skjema';
import * as React from 'react';
import {connect} from 'react-redux';
import './misc.less';
import {setSearchText} from "../../redux/actions";

class SearchBar extends React.Component<{searchText: any, setSearchText: any}, {}> {

    constructor(props: any) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    public handleChange (e: any) {
        this.props.setSearchText(e.target.value);
    }

    public render() {
        return <div className="icon-search-bar">
            <label className="search-bar-label"/>
            <Input label='Søk' value={this.props.searchText} onChange={
                (event) => this.handleChange(event)} className="search-bar-input"/>
            <div aria-live="assertive" role="alert"/>
        </div>;
    }
}

const mapStateToProps = (state: any) => {
    return {
        searchText: state.iconsStore.searchText,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    setSearchText : (searchText:string)  => dispatch(setSearchText(searchText))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);