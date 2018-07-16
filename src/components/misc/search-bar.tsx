import {Input} from 'nav-frontend-skjema';
import * as React from 'react';
import * as Redux from 'react-redux';
import Language from "../../language/norwegian";
import {SearchTextAction, setSearchText} from "../../redux/actions";
import {SearchText, Store} from "../../redux/store-interfaces";
import './misc.less';

interface PropTypes {
    searchText: SearchText;
    setSearchText: (searchText:string) => SearchTextAction;
}

class SearchBar extends React.Component<PropTypes> {

    constructor(props: PropTypes) {
        super(props)
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    public handleSearchChange (event: React.ChangeEvent<HTMLInputElement>) {
        this.props.setSearchText(event.target.value);
    }

    public render() {
        return (
            <div className="search-bar-row">
                <div className="icon-search-bar">
                    <label className="search-bar-label"/>
                    <Input label={Language.SEARCH}
                           value={this.props.searchText}
                           onChange={this.handleSearchChange}
                           className="search-bar-input"/>
                    <div aria-live="assertive" role="alert"/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: Store) => {
    return {
        searchText: state.iconsStore.searchText,
    };
};

const mapDispatchToProps = (dispatch:Redux.Dispatch) => ({
    setSearchText : (searchText:string)  => dispatch(setSearchText(searchText)),
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(SearchBar);