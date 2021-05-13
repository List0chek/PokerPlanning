import React from 'react';
import DefaultButton from '../DefaultButton/DefaultButton';
import InviteFriend from './InviteFriend/InviteFriend';
import CreateNewDiscussionControl from './CreateNewDiscussion/CreateNewDiscussionControl';
import PlayerRow from './PlayersRow/PlayerRow';
import { IRoom, IUser } from '../../store/Types';
import './DiscussionController.css';

interface IProps {
  playersList: Array<IUser>;
  url: string;

  onGoButtonClick(discussionName: string): void;
  onEnterButtonClick(isClosed: boolean): void;

  isDiscussionClosed: boolean;
  discussionName: string;
  user: IUser | null;
  room: IRoom | null;
}

interface IState {
  buttonState: string;
}

const ButtonState: Array<string> = ['notClicked', 'FinishVotingIsClicked', 'NextIsClicked'];

class DiscussionControllerView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      buttonState: ButtonState[0],
    };
    this.handleEnterButtonClick = this.handleEnterButtonClick.bind(this);
    this.handleGoButtonClick = this.handleGoButtonClick.bind(this);
  }

  public handleEnterButtonClick = () => {
    this.props.onEnterButtonClick(this.props.isDiscussionClosed);
    const i = ButtonState.indexOf(this.state.buttonState);
    this.setState({
      buttonState: ButtonState[i + 1],
    });
  };

  public handleGoButtonClick = (discussionName: string) => {
    this.props.onGoButtonClick(discussionName);
    this.setState({
      buttonState: ButtonState[0],
    });
  };

  public render() {
    const { playersList, url, isDiscussionClosed, room, user } = this.props;
    const { buttonState } = this.state;
    const currentDiscussionIndex = room && room.discussions.length - 1;
    const currentDiscussion =
      currentDiscussionIndex != undefined && room != undefined && currentDiscussionIndex >= 0
        ? room.discussions[currentDiscussionIndex]
        : null;
    return (
      <div className='story_vote'>
        <header className='story_vote_header'>Story vote completed</header>
        <div className='players_name_row'>
          <span className='players_name_text'>Players:</span>
        </div>
        <div>
          <table className={'players_table'}>
            <tbody>
              {room &&
                user &&
                currentDiscussion &&
                playersList.map((item) => {
                  const vote = currentDiscussion.votes.find((voteUser) => voteUser.user.id === item.id);
                  return (
                    <PlayerRow
                      key={item.id}
                      user={item}
                      card={currentDiscussion.votes.find((vote) => vote.user.id === item.id)?.card}
                      isCardChecked={item.id === (vote ? vote.user.id : null)}
                      isDiscussionClosed={isDiscussionClosed}
                    />
                  );
                })}
            </tbody>
          </table>
          {/*Как вариант можно ставить условие так: buttonState == ButtonState[0] || buttonState == ButtonState[1], но тогда будет хуже читабельность кода*/}
          {this.props.user &&
            this.props.room &&
            this.props.user.id === this.props.room.hostId &&
            (buttonState == 'notClicked' || buttonState == 'FinishVotingIsClicked' ? (
              <DefaultButton
                className='story_vote_button'
                buttonText={isDiscussionClosed === false ? 'Finish voting' : 'Next'}
                onClick={this.handleEnterButtonClick}
              />
            ) : (
              <CreateNewDiscussionControl onGoButtonClick={this.handleGoButtonClick} />
            ))}
        </div>
        <InviteFriend url={url} />
      </div>
    );
  }
}

export default DiscussionControllerView;
