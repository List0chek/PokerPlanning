import React from "react";
import MainHeader from "../MainHeader/mainHeader";
import Footer from "../Footer/footer";
import LoginForm from "../LoginForm/loginForm";
import "../../html/style.css";

const data = [
  {
    key: "username",
    className: "input_username",
    labelName: "Username",
    input: "Enter your name",
    inputName: "username"
  }
];

const InvitePage = () => {
  return (
    <>
      <MainHeader isAuth={false}/>
      <main className="main_main">
        <div className="main_block">
          <LoginForm title={"Join the room:"} values={data}/>
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default InvitePage;
