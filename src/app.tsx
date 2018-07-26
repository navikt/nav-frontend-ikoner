import * as React from 'react';
import * as Redux from "react-redux";
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import './app.less';
import IconList from './components/lists/icon-list';
import IconListHeader from "./components/misc/icon-list-header";
import Sidebar from "./components/sidebar";
import {fetchTags} from "./redux/actions";
import {ReceiveTagsAction} from "./redux/actions-interfaces";
import {Store} from "./redux/store-interfaces";

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

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, {}, AnyAction>) => ({
    fetchTags : ()  => dispatch(fetchTags())
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(App);