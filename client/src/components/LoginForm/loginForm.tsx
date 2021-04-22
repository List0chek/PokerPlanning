import React from "react";
import EnterButton from "../EnterButton/enterButton";
import Input from "../InputAnyName/input";
import ActionName from "../ActionName/actionName";
import IInputProps from "../InputAnyName/input";
import "./loginForm.css";

interface IProps {
  title: string;
  values: Array<any>;
}

const LoginForm: React.FunctionComponent<IProps> = (props) => {
  return (
    <form className="login_form" action="/api/room/create/" method="post">
      <h2 className="login_form_h2">{'Let\'s start!'}</h2>
      <ActionName actionName={props.title}/>
      {props.values.map((item) => {
        return <Input key={item.inputName}
                      className={item.className}
                      labelName={item.labelName}
                      placeholderText={item.input}
                      inputName={item.inputName} />;

      })}
      <EnterButton className={"login_form_button"}/>
    </form>
  );
};

export default LoginForm;
