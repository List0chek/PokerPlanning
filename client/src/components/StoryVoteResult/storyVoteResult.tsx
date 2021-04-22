import React from "react";
import StoryVoteResultInfoRow from "./VoteValueResultInfo/storyVoteResultInfo";
import "./storyVoteResult.css";

interface IProps {
  playersCount: string;
  avgVote: string;
  storyVoteResultInfoValues: Array<any>;
}

const StoryVoteResult: React.FunctionComponent<IProps> = (props) => {
  return (
    <div className="story_vote_result">
      <div className="story_vote_result_circle">
        <div className="line_players_count">{props.playersCount} Players</div>
        <div className="line_voted_caption">voted</div>
        <div className="line_vote_avg_vote">Avg: {props.avgVote}</div>
      </div>
      <ul className="story_vote_result_info">
        {props.storyVoteResultInfoValues.map((array) => {
          return <StoryVoteResultInfoRow key={array.voteValueMark}
                                         className={array.className}
                                         voteValueMark={array.voteValueMark}
                                         playersCount={array.playersCount}
                                         playersPercentage={array.playersPercentage}/>;
        })}
      </ul>
    </div>
  );
};

export default StoryVoteResult;

