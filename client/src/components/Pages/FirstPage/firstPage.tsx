import React from "react";
import MainHeader from "../../MainHeader/mainHeader";
import Footer from "../../Footer/footer";
import LoginForm from "../../LoginForm/loginForm";

const data = [
  {
    className: "input_username",
    labelName: "Username",
    input: "Enter your name",
    inputName: "username"
  },
  {
    className: "input_roomname",
    labelName: "Room name",
    input: "Enter room name",
    inputName: "roomname"
  }
];

const FirstPage = () => {
  return (
    <>
      <MainHeader isAuth={false}/>
      <main className="main_main">
        <div className="main_block">
          <LoginForm title={"Create the room:"} values={data}/>
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default FirstPage;
