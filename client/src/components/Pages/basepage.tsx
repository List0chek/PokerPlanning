import React from "react";
import MainHeader from "../MainHeader/mainHeader";
import Footer from "../Footer/footer";

const BasePage: React.FunctionComponent<any> = (props) => {
  return (
    <>
      <MainHeader isAuth={false}/>
      {props.children}
      <Footer/>
    </>
  );
};

export default BasePage;
