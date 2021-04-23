import React from "react";
import "./storyVoteButton.css";

interface IProps {
  className: string;
  buttonText: any;
  onClick(): void;
}

const StoryVoteButton: React.FunctionComponent<IProps> = (props) => {

  const handleClick = () => {
    props.onClick();
  };

  return (
    <button className={props.className} type="button" onClick={handleClick}>{props.buttonText}</button>
  );
};

export default StoryVoteButton;
