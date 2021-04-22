import React from "react";
import "./storyVoteResultInfo.css";

interface IProps {
  className: string;
  voteValueMark: string;
  playersCount: string;
  playersPercentage: string;
}

const StoryVoteResultInfoRow: React.FunctionComponent<IProps> = (props) => {
  return (
        <li className={props.className}>
          <span className="vote_value_mark">{props.voteValueMark}</span>
          <span className="vote_value_info">{props.playersPercentage}% ({props.playersCount} player)</span>
        </li>
  );
};

export default StoryVoteResultInfoRow;
