import { Input } from "nav-frontend-skjema";
import * as React from "react";
import * as Redux from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Language from "../language/norwegian";
import { setSearchText } from "../redux/actions";
import { SearchTextAction } from "../redux/actions-interfaces";
import { Store } from "../redux/store-interfaces";
import "./search-bar.less";

interface PropTypes {
  searchText: string;
  setSearchText: (searchText: string) => SearchTextAction;
}

class SearchBar extends React.Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  public render() {
    return (
      <div className="search-bar-row">
        <div className="icon-search-bar">
          <label className="search-bar-label" />
          <Input
            label={Language.SEARCH}
            value={this.props.searchText}
            autoFocus={true}
            onChange={this.handleSearchChange}
            inputClassName="search-bar-input"
          />
          <div aria-live="assertive" role="alert" />
        </div>
      </div>
    );
  }

  private handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.setSearchText(event.target.value);
  }
}

const mapStateToProps = (state: Store) => {
  return {
    searchText: state.iconsStore.searchText
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, {}, AnyAction>) => ({
  setSearchText: (searchText: string) => dispatch(setSearchText(searchText))
});

export default Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
