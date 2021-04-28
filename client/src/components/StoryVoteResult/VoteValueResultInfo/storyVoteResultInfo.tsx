import React from 'react';
import './storyVoteResultInfo.css';

export interface IStoryVoteResultInfoRowProps {
  className?: string;
  voteValueMark: string;
  playersCount: string;
  playersPercentage: string;
}

const StoryVoteResultInfoRow: React.FunctionComponent<IStoryVoteResultInfoRowProps> = (props) => {
  return (
    <li className={props.className}>
      <span className='vote_value_mark'>{props.voteValueMark === '☕' ? '☕' : props.voteValueMark}</span>
      <span className='vote_value_info'>
        {props.playersPercentage}% ({props.playersCount} player)
      </span>
    </li>
  );
};

export default StoryVoteResultInfoRow;
