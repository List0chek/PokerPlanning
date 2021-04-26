import React from "react";
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import {RoutePath} from "../../routes";
import MainHeader from "../../MainHeader/mainHeader";
import Footer from "../../Footer/footer";
import LoginForm from "../../LoginForm/loginForm";


const data = [
  {
    className: "input_username",
    labelName: "Username",
    placeholderText: "Enter your name",
    inputName: "username"
  }
];

interface IMatchParams {
  id: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {
  className?: string;
}

const InvitePage: React.FC<IProps> = (props) => {

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.history.push (`${RoutePath.MAIN}/${props.match.params.id}`)
  };

  return (
    <>
      <MainHeader isAuth={false}/>
      <main className="main_main">
        <div className="main_block">
          <LoginForm title={"Join the room:"} values={data} onClick={handleSubmit} onSubmit={handleSubmit}/>
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default withRouter(InvitePage);
