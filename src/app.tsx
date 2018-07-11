import * as React from 'react';
import './app.less';
import IconList from './components/lists/icon-list';
import InformationPanel from "./components/misc/information-panel";
import SearchBar from "./components/misc/search-bar";


class App extends React.Component {

    public render() {
        return (
            <div className="app">
                <header className="app-header">
                    <h1 className="app-title">NAV ikon-base</h1>
                </header>
                <div className="app-content">
                    <div className="column-icon-list">
                        <SearchBar/>
                        <IconList/>
                    </div>
                    <InformationPanel/>
                </div>
            </div>
        );
    }
}

export default App;