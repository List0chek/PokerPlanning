import React from 'react';
import StoryVoteButton from '../StoryVoteButton/storyVoteButton';
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

class StoryVote extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleStoryVoteButtonClick = this.handleStoryVoteButtonClick.bind(this);
    this.handleGoButtonClick = this.handleGoButtonClick.bind(this);
  }

  public handleStoryVoteButtonClick = () => {
    this.props.onStoryVoteButtonClick(this.props.isClosed);
  };

  public handleGoButtonClick = (discussionName: string) => {
    this.props.onGoButtonClick(discussionName);
  };

  public render() {
    const { playersList, url, isClosed } = this.props;

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
          {isClosed === false ? (
            <StoryVoteButton
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
