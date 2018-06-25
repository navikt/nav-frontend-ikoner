import * as React from 'react';
import './app.less';
import SearchButton from "./components/buttons/search-button";
import IconList from './components/lists/icon-list';
import SearchBar from "./components/Misc/search-bar";
import SidePanel from "./components/Misc/side-panel";
import logo from './logo.svg';

class App extends React.Component {

    public render() {
        return (
            <div className="app">
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <h1 className="app-title">Liste av ikoner</h1>
                </header>
                <SearchBar/>
                <SearchButton/>
                <div className="row">
                    <IconList/>
                    <SidePanel/>
                </div>


            </div>
        );
    }
}

export default App;