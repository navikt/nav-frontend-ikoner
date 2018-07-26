import * as React from 'react';
import IconStyleSelect from './icon-style-select';
import './misc.less';
import SearchBar from './search-bar';

function IconListHeader() {
    return (
        <div className="icon-list-header">
            <SearchBar/>
            <IconStyleSelect/>
        </div>
    );
}

export default IconListHeader;