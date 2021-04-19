import React from "react";
import FirstPageHeader from "../FirstPageHeader/firstPageHeader";
import Footer from "../Footer/footer";
import LoginForm from "../LoginForm/loginForm";
import "../../html/style.css";
import JoinRoomForm from "../LoginForm/joinRoomForm";

const InvitePage = () => {
  return (
    <>
      <FirstPageHeader/>
      <main className="main_main">
        <div className="main_block">
          <JoinRoomForm/>
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default InvitePage;
