import * as React from 'react';
import * as Redux from "react-redux";
import './app.less';
import IconList from './components/lists/icon-list';
import IconListHeader from "./components/misc/icon-list-header";
import Sidebar from "./components/sidebar";
import {ReceiveTagsAction} from "./redux/actions";
import {Store} from "./redux/store-interfaces";
import api from "./utils/api";

interface PropTypes {
    fetchTags: () => Promise<ReceiveTagsAction>
};

class App extends React.Component <PropTypes> {

    public componentDidMount() {
        this.props.fetchTags();
    }

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

const mapStateToProps = (state: Store) => {
    return {};
};
const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
    fetchTags: () => api.fetchTags()(dispatch)
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(App);