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

class UserButton extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleSignOutButtonClick = this.handleSignOutButtonClick.bind(this);
  }

  handleSignOutButtonClick() {
    return;
  }

  render() {
    return (
      <button className='user_btn' id='user_button'>
        <div className={'user_btn_username_and_logo_wrap'}>
          <span className='user_btn_username'>{this.props.userName}</span>
          <img src={userIcon} alt='userIcon' width='59' height='59' />

          <DefaultButton
            onClick={this.handleSignOutButtonClick}
            buttonText={'Sign out'}
            className={'sign_out_button'}
          />
        </div>
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
