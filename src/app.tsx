/* tslint:disable */
import {connect} from 'react-redux';
import * as React from 'react';
import './app.less';
import IconList from './components/lists/icon-list';
import SearchBar from "./components/misc/search-bar";
import SidePanel from "./components/misc/side-panel";
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
                    <h1 className="app-title">NAV ikon-base</h1>
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
    fetchIcons : (searchText: string)  => dispatch(api.fetchIcons(searchText))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);