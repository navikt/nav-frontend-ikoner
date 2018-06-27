/* tslint:disable */
import {Input} from 'nav-frontend-skjema';
import * as React from 'react';
import * as Redux from 'react-redux';
import {setSearchText} from "../../redux/actions";
import {SearchText, Store} from "../../redux/store-interfaces";
import './misc.less';


interface PropTypes {searchText: SearchText, setSearchText: typeof setSearchText}

class SearchBar extends React.Component<PropTypes> {

    constructor(props: PropTypes) {
        super(props)
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    public handleSearchChange (searchText: string) {
        this.props.setSearchText(searchText);
    }

    public render() {
        return <div className="icon-search-bar">
            <label className="search-bar-label"/>
            <Input label='Søk' value={this.props.searchText} onChange={
                (event) => this.handleSearchChange(event.target.value)} className="search-bar-input"/>
            <div aria-live="assertive" role="alert"/>
        </div>;
    }
}

const mapStateToProps = (state: Store) => {
    return {
        searchText: state.iconsStore.searchText,
    };
};

const mapDispatchToProps = (dispatch:Redux.Dispatch) => ({
    setSearchText : (searchText:string)  => dispatch(setSearchText(searchText))
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(SearchBar);