import * as classNames from "classnames";
import { guid } from "nav-frontend-js-utils";
import "nav-frontend-skjema-style";
import SkjemaelementFeilmelding, {
  SkjemaelementFeil,
  skjemaelementFeilmeldingShape
} from "nav-frontend-skjema/lib/skjemaelement-feilmelding"; // tslint:disable-line:max-line-length
import * as PT from "prop-types";
import * as React from "react";

const cls = (className?: string) =>
  classNames("skjemaelement skjemaelement--horisontal", className);
const inputCls = (harFeil?: object) =>
  classNames("skjemaelement__input checkboks", {
    "skjemaelement__input--harFeil": harFeil
  });

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Klassenavn
   */
  className?: string;
  /**
   * Label for checkbox
   */
  label: React.ReactNode;
  /**
   * Id for checkbox, hvis id ikke er satt brukes en tilfeldig guid
   */
  id?: string;
  /**
   * Hvis skjemaet har feil sender man inn et objekt med en feilmelding
   */
  feil?: SkjemaelementFeil;
  /**
   * Referanse til selve checkboxen. Brukes for eksempel til å sette fokus
   */
  checkboxRef?: () => any;
}

/**
 * Checkbox
 */
export class Checkbox extends React.Component<CheckboxProps, {}> {
  public render() {
    const { className, label, id, feil, checkboxRef, ...other } = this.props;
    const inputId = id || guid();
    // tslint:disable:react-a11y-role-has-required-aria-props
    return (
      <div className={cls(className)}>
        <input
          type="checkbox"
          className={inputCls(feil)}
          id={inputId}
          ref={checkboxRef}
          {...other}
        />
        <label className="skjemaelement__label" htmlFor={inputId}>
          {label}
        </label>
        <SkjemaelementFeilmelding feil={feil} />
      </div>
    );
  }
}

(Checkbox as React.ComponentClass).propTypes = {
  /**
   * Referanse til selve checkboxen. Brukes for eksempel til å sette fokus
   */
  checkboxRef: PT.func,
  /**
   * ClassName
   */
  className: PT.string,
  /**
   * Hvis skjemaet har feil sender man inn et objekt med en feilmelding
   */
  feil: skjemaelementFeilmeldingShape,
  /**
   * Id for checkbox, hvis id ikke er satt brukes en tilfeldig guid
   */
  id: PT.string,
  /**
   * Label for checkbox
   */
  label: PT.node.isRequired
};

(Checkbox as React.ComponentClass).defaultProps = {
  checkboxRef: undefined,
  className: undefined,
  feil: undefined,
  id: undefined
};

export default Checkbox;
