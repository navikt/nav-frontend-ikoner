import * as React from 'react';
// import api from '../../utils/api';
import './misc.less';

class SearchBar extends React.Component {

    public render() {
        return (
            <div className="search-bar">
                <label className="search-bar-label"/>
                <input className="search-bar-input" type="text"/>
                <div aria-live="assertive" role="alert"/>
            </div>
        );
    }
}

export default SearchBar;