import React from 'react';
import userIcon from '../../images/User Icon.svg';
import DefaultButton from '../defaultButton/defaultButton';
import { connect } from 'react-redux';
import { IRootState, IUser } from '../../Store/types';
import './userButton.css';
import { Dispatch } from 'redux';

interface IProps {
  userName: string;
  /*deleteUser(): void;*/
}

interface IState {
  isSignButtonHovering: boolean;
}

class UserButton extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleSignOutButtonClick = this.handleSignOutButtonClick.bind(this);
    this.state = {
      isSignButtonHovering: false,
    };
  }

  handleMouseEnter() {
    this.setState({
      isSignButtonHovering: true,
    });
  }

  handleMouseLeave() {
    this.setState({
      isSignButtonHovering: false,
    });
  }

  handleSignOutButtonClick() {
    /*this.props.deleteUser();*/
    this.setState({
      isSignButtonHovering: false,
    });
  }

  render() {
    return (
      <button
        className='user_btn'
        id='user_button'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={'user_btn_username_and_logo_wrap'}>
          <span className='user_btn_username'>{this.props.userName}</span>
          <img src={userIcon} alt='userIcon' width='59' height='59' />
        </div>
        {this.state.isSignButtonHovering && (
          <DefaultButton
            onClick={this.handleSignOutButtonClick}
            buttonText={'Sign out'}
            className={'sign_out_button'}
          />
        )}
      </button>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    user: state.user,
  };
};

/*const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    deleteUser: () => dispatch(deleteUser()),
  };
};*/

export default connect(mapStateToProps /*mapDispatchToProps*/)(UserButton);
