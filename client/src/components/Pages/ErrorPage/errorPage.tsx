import React from "react";
import MainHeader from "../../MainHeader/mainHeader";
import Footer from "../../Footer/footer";

const ErrorPage = () => {
  return (
    <>
      <MainHeader isAuth={false}/>
      <main className="main_main">
        <div className="main_block">
          <div className="errorText"><p className="errorText">{'This page doesn\'t exist!'}</p></div>

        </div>
      </main>
      <Footer/>
    </>
  );
};

export default ErrorPage;
