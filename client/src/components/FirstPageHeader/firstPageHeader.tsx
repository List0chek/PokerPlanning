import React from "react";
import logo from '../../images/pie_chart_24px.svg';
import "./firstPageHeader.css";

const FirstPageHeader = () => {
  return (
    <header className="main_header">
      <div className="main_header_content_block">
        <a className="main_page_url"
           href="http://localhost:3000/">
          <img className="main_page_url_logo" src={logo} alt="logo" width="48.33"
               height="48.33"/>
            <h1 className="main_page_url_name">PlanPoker</h1>
        </a>
      </div>
    </header>
);
};

export default FirstPageHeader;
