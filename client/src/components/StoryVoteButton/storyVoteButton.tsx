import React from "react";
import "./storyVoteButton.css";

interface IProps {
  className: string;
  buttonText: any;
}

const StoryVoteButton: React.FunctionComponent<IProps> = (props) => {
  return (
    <button className={props.className} type="button">{props.buttonText}</button>
  );
};

export default StoryVoteButton;
