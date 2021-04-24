import React from "react";
import MainLogoWithURL from "../MainLogoWithURL/mainLogoWithURL";
import UserButton from "../UserButton/userButton";
import "./mainHeader.css";

interface IProps {
  isAuth: boolean;
}

const MainHeader: React.FunctionComponent<IProps> = (props) => {
  return (
    <header className="main_header">
      <div className="main_header_content_block">
        <MainLogoWithURL/>
        {props.isAuth && <UserButton/>}
      </div>
    </header>
  );
};

export default MainHeader;
