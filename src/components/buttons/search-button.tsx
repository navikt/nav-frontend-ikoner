import * as React from 'react';
// import api from '../../utils/api';
import './buttons.less';

class SearchButton extends React.Component {

    public render() {
        return (
            <button type="submit" className="search-button">Search</button>
        );
    }
}

export default SearchButton;