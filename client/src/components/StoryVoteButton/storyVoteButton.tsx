import React from "react";
import "./storyVoteButton.css";

interface IProps {
  className: string;
  buttonText: any;
  onClick(): void;
  /*onDeleteStory(isClicked: boolean): void;*/
}

const StoryVoteButton: React.FunctionComponent<IProps> = (props) => {

  const handleClick = () => {
    props.onClick();
  };

 /* const handleDelete = () => {
    props.onDeleteStory(true);
  }*/

  return (
    <button className={props.className} type="button" onClick={handleClick}>{props.buttonText}</button>
  );
};

export default StoryVoteButton;
