import React from "react";
import "./loginForm.css";
import "../InputAnyName/inputAnyName.css"
import EnterButton from "../EnterButton/enterButton";
import InputAnyName from "../InputAnyName/inputAnyName";
import ActionName from "../ActionName/actionName";

const LoginForm = () => {
  return (
    <form className="login_form" action="/api/room/create/" method="post">
      <h2 className="login_form_h2">{'Let\'s start!'}</h2>
      <ActionName actionName={"Create the room:"}/>
      <InputAnyName key={"username"}
                    inputClassName={"input_username"}
                    labelName={"Username"}
                    placeholderText={"Enter your name"}/> {/*нужен ли тут key?*/}
      <InputAnyName key={"roomname"}
                    inputClassName={"input_roomname"}
                    labelName={"Room name"}
                    placeholderText={"Enter room name"}/> {/*нужен ли тут key?*/}
      <EnterButton/>
    </form>
  );
};

export default LoginForm;
