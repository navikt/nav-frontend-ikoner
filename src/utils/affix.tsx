import classNames from "classnames";
import { autobind } from "nav-frontend-js-utils";
import * as React from "react";
import { Component } from "react";

/* tslint:disable */
interface PropTypes {
  auto: boolean;
  offset: number;
  className?: string;
  children: any;
}

interface StateTypes {
  affix: any;
  offset: any;
}
class Affix extends Component<PropTypes, StateTypes> {
  private element: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.element = React.createRef();

    this.state = {
      affix: false,
      offset: props.offset
    };

    autobind(this);
  }

  public componentDidMount() {
    document.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.autooffset);

    if (this.props.auto) {
      this.autooffset();
    }
  }

  public render() {
    const affix = this.state.affix;
    const { className, children } = this.props;
    return (
      <div ref={this.element} className={classNames(className, { affix })}>
        {children}
      </div>
    );
  }

  public componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.autooffset);
  }

  private autooffset() {
    if (this.props.auto && this.element) {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      this.setState(
        {
          offset:
            scrollTop +
            (this.element.current as HTMLDivElement).getBoundingClientRect().top
        },
        this.handleScroll
      );
    }
  }

  private handleScroll() {
    console.log("Scrolling");
    const affix = this.state.affix;
    const offset = this.state.offset;
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );

    if (!affix && scrollTop > offset) {
      this.setState({ affix: true });
    }

    if (affix && scrollTop < offset) {
      this.setState({ affix: false });
    }
  }
}

export default Affix;
