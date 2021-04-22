import React from "react";
import "./input.css";

export interface IInputProps {
  className: string;
  labelName: string;
  placeholderText?: string;
  inputName?: string;
}

const Input: React.FunctionComponent<IInputProps> = (props) => {
  return (
      <div className={props.className}>
        <label className="login_form_label" htmlFor={props.labelName}>
          {props.labelName}
        </label>
        <input className="textarea_name" id={props.labelName} type="text" name={props.inputName} placeholder={props.placeholderText}
               required/>
      </div>
  );
};

export default Input;
