import React from 'react';
import MainLogoWithURL from '../MainLogoWithURL/mainLogoWithURL';
import UserButton from '../UserButton/userButton';
import { IRootState, IUser } from '../../Store/types';
import { connect } from 'react-redux';
import './mainHeader.css';

interface IProps {
  user: IUser | null;
}

const MainHeader: React.FunctionComponent<IProps> = (props) => {
  return (
    <header className='main_header'>
      <div className='main_header_content_block'>
        <MainLogoWithURL />
        {props.user && <UserButton userName={props.user.name} />}
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
