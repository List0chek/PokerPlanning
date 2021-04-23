import React from "react";
import PlayerRow from "./PlayersRow/playerRow";
import StoryVoteButton from "../StoryVoteButton/storyVoteButton";
import InviteFriend from "./InviteFriend/inviteFriend";
import CreateNewDiscussionControl from "./CreateNewDiscussion/createNewDiscussionBlock";
import "./storyVote.css";

interface IProps {
  buttonText?: string;
  playersList: Array<any>;
  url: string;
  buttonClass?: string;

  onStoryVoteButtonClick(discussionState: number, discussionName: string): void;

  discussionState: number;
  discussionName: string;
}

class StoryVote extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleStoryVoteButtonClick = this.handleStoryVoteButtonClick.bind(this);
  }

  public handleStoryVoteButtonClick = () => {
    this.props.onStoryVoteButtonClick(this.props.discussionState, this.props.discussionName);
  }

  public render() {
    const {playersList} = this.props;
    const {url} = this.props;
    const {discussionState} = this.props;
    const {discussionName} = this.props;
    return (
      <div className="story_vote">
        <header className="story_vote_header">
          Story vote completed
        </header>
        <div className="players_name_row">
          <span className="players_name_text">Players:</span>
        </div>
        <div>
          <table className={"players_table"}>
            <tbody>
            {playersList.map((array) => {
              return <PlayerRow key={array.username}
                                username={array.username}
                                value={array.value}
                                isChecked={array.isChecked}/>;
            })}
            </tbody>
          </table>
          {discussionState == 0 || discussionState == 1
            ? <StoryVoteButton className="story_vote_button"
                               buttonText={discussionState == 0 ? "Finish voting" : "Next"}
                               onClick={this.handleStoryVoteButtonClick}/>
            : <CreateNewDiscussionControl onGoButtonClick={this.handleStoryVoteButtonClick} />}
        </div>
        <InviteFriend url={url}/>
      </div>
    );
  }
}

export default StoryVote;
