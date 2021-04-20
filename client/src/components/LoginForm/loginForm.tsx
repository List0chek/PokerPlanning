import React from "react";
import "./loginForm.css";
import EnterButton from "../EnterButton/enterButton";
import Input from "../InputAnyName/input";
import ActionName from "../ActionName/actionName";

interface IProps {
  title: string;
  values: Array<any>;
}


const LoginForm: React.FunctionComponent<IProps> = (props) => {
  return (
    <form className="login_form" action="/api/room/create/" method="post">
      <h2 className="login_form_h2">{'Let\'s start!'}</h2>
      <ActionName actionName={props.title}/>
      {props.values.map((array) => {
        return <Input key={array.key}
                      className={array.className}
                      labelName={array.labelName}
                      placeholderText={array.input}
                      inputName={array.inputName} />;

      })}
      {/*<Input key={"username"}
                    className={"input_username"}
                    labelName={"Username"}
                    input={"Enter your name"}
                    inputName={"username"}/>
      <Input key={"roomname"}
                    className={"input_roomname"}
                    labelName={"Room name"}
                    input={"Enter room name"}
                    inputName={"roomname"}/>*/}
      <EnterButton/>
    </form>
  );
};

export default LoginForm;
