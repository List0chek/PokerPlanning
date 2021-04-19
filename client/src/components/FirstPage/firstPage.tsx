import React from "react";
import FirstPageHeader from "../FirstPageHeader/firstPageHeader";
import Footer from "../Footer/footer";
import LoginForm from "../LoginForm/loginForm";
import "../../html/style.css";

const FirstPage = () => {
  return (
    <>
      <FirstPageHeader/>
      <main className="main_main">
        <div className="main_block">
          <LoginForm/>
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default FirstPage;
