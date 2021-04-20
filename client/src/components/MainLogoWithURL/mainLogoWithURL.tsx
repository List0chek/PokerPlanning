import React from "react";
import logo from '../../images/pie_chart_24px.svg';
import "./mainLogoWithURL.css";

const MainLogoWithURL = () => {
  return (
    <a className="main_page_url"
       href="http://localhost:3000/">
      <img className="main_page_url_logo" src={logo} alt="logo" width="48.33"
           height="48.33"/>
      <h1 className="main_page_url_name">PlanPoker</h1>
    </a>
  );
};

export default MainLogoWithURL;
