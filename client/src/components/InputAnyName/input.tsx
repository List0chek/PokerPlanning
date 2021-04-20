import React from "react";
import "./input.css";

interface IProps {
  className: string;
  labelName: string;
  placeholderText?: string;
  inputName?: string;
}

const Input: React.FunctionComponent<IProps> = (props) => {
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
