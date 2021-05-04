import React from 'react';
import userIcon from '../../images/User Icon.svg';
import './userButton.css';

interface IProps {
  userName: string;
}

const UserButton: React.FunctionComponent<IProps> = (props) => {
  return (
    <button className='user_btn' id='user_button'>
      <span className='user_btn_username'>{props.userName}</span>
      <img src={userIcon} alt='userIcon' width='59' height='59' />
    </button>
  );
};

export default UserButton;
