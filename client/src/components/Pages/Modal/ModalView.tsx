import React from 'react';
import '../../DiscussionControllerBlock/DiscussionController.css';
import PlayerRow from '../../DiscussionControllerBlock/PlayersRow/PlayerRow';
import { IDiscussion, IRoom, IUser } from '../../../store/Types';
import './Modal.css';

interface IProps {
  openedDiscussionId: string;

  playersList: Array<IUser>;

  room: IRoom | null;

  onStoryDetailsCloseButtonClick(): void;
}

const ModalView: React.FunctionComponent<IProps> = (props) => {
  const handleStoryDetailsCloseButtonClick = () => {
    props.onStoryDetailsCloseButtonClick();
  };

  let discussionInModal: IDiscussion | undefined;
  if (props.room) {
    discussionInModal = props.room.discussions.find((discussion) => discussion.id === props.openedDiscussionId);
  }

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
              if (props.room) {
                return (
                  <PlayerRow
                    key={item.id}
                    user={item}
                    card={discussionInModal?.votes.find((vote) => vote.user.id === item.id)?.card}
                    isDiscussionClosed={true}
                  />
                );
              }
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

export default ModalView;
