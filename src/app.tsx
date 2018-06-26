/* tslint:disable */
import {connect} from 'react-redux';
import * as React from 'react';
import './app.less';
import IconList from './components/lists/icon-list';
import SearchBar from "./components/Misc/search-bar";
import SidePanel from "./components/Misc/side-panel";
import api from "./utils/api";

class App extends React.Component {

    constructor(props: any){
        super(props);
        props.fetchIcons();
    }

    public render() {
        return (
            <div className="app">
                <header className="app-header">
                    <h1 className="app-title">Ikoner</h1>
                </header>
                <div className="container-search-bar">
                    <SearchBar/>
                </div>
                <div className="icon-row">
                    <div className="container-icon-list">
                        <IconList/>
                    </div>
                    <div className="container-side-panel">
                        <SidePanel/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        icons: state.icons,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    fetchIcons : ()  => dispatch(api.fetchIcons())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);