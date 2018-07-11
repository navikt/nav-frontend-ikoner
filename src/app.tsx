import * as React from 'react';
import './app.less';
import IconList from './components/lists/icon-list';
import IconListHeader from "./components/misc/icon-list-header";
import Sidebar from "./components/sidebar";


class App extends React.Component {

    public render() {
        return (
            <div className="app">
                <header className="app-header">
                    <h1 className="app-title">NAV ikon-base</h1>
                </header>
                <div className="app-content">
                    <div className="column-icon-list">
                        <IconListHeader/>
                        <IconList/>
                    </div>
                    <Sidebar/>
                </div>
            </div>
        );
    }
}

export default App;