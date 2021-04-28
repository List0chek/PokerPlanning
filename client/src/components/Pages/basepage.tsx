import React from "react";
import MainHeader from "../MainHeader/mainHeader";
import Footer from "../Footer/footer";

interface IProps {
  className?: string;
}

interface IState {
  isAuth: boolean;
}

class BasePage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isAuth: false
    };
  }

  public render() {
    return (
      <>
        <MainHeader isAuth={this.state.isAuth}/>
        {this.props.children}
        <Footer/>
      </>
    );
  }
}

export default BasePage;
