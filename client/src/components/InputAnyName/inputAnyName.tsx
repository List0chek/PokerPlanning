import React from "react";
import "./inputAnyName.css";

interface IProps {
  inputClassName: string;
  labelName?: string;
  placeholderText?: string;
}

const InputAnyName: React.FunctionComponent<IProps> = (props) => {
  return (
      <div className={props.inputClassName}>
        <label className="login_form_label" htmlFor="name">
          {props.labelName}
        </label>
        <input className="textarea_name" id="name" type="text" name="username" placeholder={props.placeholderText}
               required/>
      </div>
  );
};

export default InputAnyName;
