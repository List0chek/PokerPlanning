import React from 'react';
import DefaultButton from '../defaultButton/defaultButton';
import InviteFriend from './InviteFriend/inviteFriend';
import CreateNewDiscussionControl from './CreateNewDiscussion/createNewDiscussionBlock';
import PlayerRow, { IPlayerRowProps } from '../StoryVoteCompletedBlock/PlayersRow/playerRow';
import './storyVote.css';

interface IProps {
  buttonText?: string;
  playersList: Array<IPlayerRowProps>;
  url: string;
  buttonClass?: string;

  onGoButtonClick(discussionName: string): void;
  onStoryVoteButtonClick(isClosed: boolean): void;

  isClosed: boolean;
  discussionName: string;
}

interface IState {
  buttonState: string;
}

const ButtonState: Array<string> = ['notClicked', 'FinishVotingIsClicked', 'NextIsClicked'];

class StoryVote extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      buttonState: ButtonState[0],
    };
    this.handleStoryVoteButtonClick = this.handleStoryVoteButtonClick.bind(this);
    this.handleGoButtonClick = this.handleGoButtonClick.bind(this);
  }

  public handleStoryVoteButtonClick = () => {
    this.props.onStoryVoteButtonClick(this.props.isClosed);
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
    const { playersList, url, isClosed } = this.props;
    const { buttonState } = this.state;

    return (
      <div className='story_vote'>
        <header className='story_vote_header'>Story vote completed</header>
        <div className='players_name_row'>
          <span className='players_name_text'>Players:</span>
        </div>
        <div>
          <table className={'players_table'}>
            <tbody>
              {playersList.map((item) => {
                return (
                  <PlayerRow
                    key={item.username}
                    username={item.username}
                    value={item.value}
                    isChecked={item.isChecked}
                    isClosed={item.isClosed}
                  />
                );
              })}
            </tbody>
          </table>
          {/*Как вариант можно ставить условие так: buttonState == ButtonState[0] || buttonState == ButtonState[1], но тогда будет хуже читабельность кода*/}
          {buttonState == 'notClicked' || buttonState == 'FinishVotingIsClicked' ? (
            <DefaultButton
              className='story_vote_button'
              buttonText={isClosed === false ? 'Finish voting' : 'Next'}
              onClick={this.handleStoryVoteButtonClick}
            />
          ) : (
            <CreateNewDiscussionControl onGoButtonClick={this.handleGoButtonClick} />
          )}
        </div>
        <InviteFriend url={url} />
      </div>
    );
  }
}

export default StoryVote;
