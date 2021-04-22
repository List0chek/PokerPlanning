import React from "react";
import "../../StoryVoteCompletedBlock/storyVote.css";
import PlayerRow from "../../StoryVoteCompletedBlock/PlayersRow/playerRow";
import "./modal.css";

interface IProps {
  playersList: Array<any>;
}

const Modal: React.FunctionComponent<IProps> = (props) => {
  return (
    <>
      <main className="main_main">
        <div className="main_block">
          <div className="story_details">
            <header className="story_details_header">
              Story details
            </header>
            <div className="players_name_row">
              <span className="players_name_text">Players:</span>
            </div>
            <table className="players_table">
              <tbody>
              {props.playersList.map((item) => {
                return <PlayerRow key={item.username}
                                  username={item.username}
                                  value={item.value}/>;
              })}
              </tbody>
            </table>
            <button className="story_details_button" type="button">Close</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Modal;
