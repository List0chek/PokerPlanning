import React from 'react';
import MainLogoWithURL from '../MainLogoWithURL/mainLogoWithURL';
import UserButton from '../UserButton/userButton';
import { ICard, IRootState, IUser } from '../../Store/types';
import './mainHeader.css';
import { compose, Dispatch } from 'redux';
import { vote } from '../../Store/room/room-action-creators';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IMainPageProps } from '../Pages/RoomPage/roomPage';

interface IProps {
  user: IUser | null;
}

const MainHeader: React.FunctionComponent<IProps> = ({ user }) => {
  return (
    <header className='main_header'>
      <div className='main_header_content_block'>
        <MainLogoWithURL />
        {user && <UserButton userName={user.name} />}
      </div>
    </header>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(MainHeader);
