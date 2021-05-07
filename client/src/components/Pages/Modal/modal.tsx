import React from 'react';
import '../../DiscussionControllerBlock/discussionController.css';
import PlayerRow, { IPlayerRowProps } from '../../DiscussionControllerBlock/PlayersRow/playerRow';
import './modal.css';
import { IVote } from '../../../Store/types';
import { compose, Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IMainPageProps } from '../RoomPage/roomPage';

interface IProps {
  playersList: Array<IVote>;

  onStoryDetailsCloseButtonClick(): void;
}

const Modal: React.FunctionComponent<IProps> = (props) => {
  const handleStoryDetailsCloseButtonClick = () => {
    props.onStoryDetailsCloseButtonClick();
  };

  return (
    <div className='modal_block_isOpened'>
      <div className='story_details'>
        <header className='story_details_header'>Story details</header>
        <div className='players_name_row'>
          <span className='players_name_text'>Players:</span>
        </div>
        <table className='players_table'>
          <tbody>
            {props.playersList.map((item) => {
              return <PlayerRow key={item.user.id} user={item.user} card={item.card} isDiscussionClosed={true} />;
            })}
          </tbody>
        </table>
        <button className='story_details_button' type='button' onClick={handleStoryDetailsCloseButtonClick}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
