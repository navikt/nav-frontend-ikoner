import * as React from 'react';
import './app.less';
import logo from './logo.svg';
import api from './utils/api';

class App extends React.Component {

    public componentDidMount(){
        api.fetchAllIcons();
    }

    public render() {
        return (
            <div className="app">
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <h1 className="app-title">Welcome to React</h1>
                </header>
                <p className="app-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;