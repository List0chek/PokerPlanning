import React from "react";
import "./storyVote.css";
import PlayerRow from "./PlayersRow/playerRow";
import StoryVoteButton from "../StoryVoteButton/storyVoteButton";
import InviteFriend from "./InviteFriend/inviteFriend";
import StoryVoteSearchBlock from "./SearchBlock/searchBlock";

interface IProps {
  buttonText?: string;
  playersList: Array<any>;
  url: string;
  buttonClass?: string;
}

const StoryVote: React.FunctionComponent<IProps> = (props) => {
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
          {props.playersList.map((array) => {
            return <PlayerRow key={array.username}
                              username={array.username}
                              value={array.value}
                              isChecked={array.isChecked}/>;
          })}
          </tbody>
        </table>
        {props.buttonClass == "story_vote_button" ? <StoryVoteButton className={props.buttonClass} buttonText={props.buttonText} /> : <StoryVoteSearchBlock />}
        {/*<StoryVoteButton className={"story_vote_button"} buttonText={props.buttonText} />*/}
      </div>
      <InviteFriend url={props.url}/>
    </div>
  );
};

export default StoryVote;


