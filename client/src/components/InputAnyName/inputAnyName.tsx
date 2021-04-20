import React from "react";
import "./inputAnyName.css";

interface IProps {
  className: string;
  labelName: string;
  input?: string;
  inputName?: string;
}

const InputAnyName: React.FunctionComponent<IProps> = (props) => {
  return (
      <div className={props.className}>
        <label className="login_form_label" htmlFor={props.labelName}>
          {props.labelName}
        </label>
        <input className="textarea_name" id={props.labelName} type="text" name={props.inputName} placeholder={props.input}
               required/>
      </div>
  );
};

export default InputAnyName;
