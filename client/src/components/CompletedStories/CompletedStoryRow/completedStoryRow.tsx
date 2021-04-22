import React from "react";
import deleteStoryIcon from "../../../images/delete_24px.svg";
import StoryVoteButton from "../../StoryVoteButton/storyVoteButton";
import "./completedStoryRow.css";

interface IProps {
  storyName: string;
  avgVote: string;
  onClick(storyName: string): void;
  onDelete(): void;
}

const CompletedStoryRow: React.FunctionComponent<IProps> = (props) => {

  const handleClick = () => {
    props.onClick(props.storyName);
  };

  const handleDelete = () => {
    props.onDelete();
  };

  return (
    <tr className="row">
      <td className="completed_stories_cell_storyname" onClick={handleClick}>{props.storyName}</td>
      <td className="completed_stories_cell_avg_vote">{props.avgVote}</td>
      <td className="completed_stories_cell_delete_story_button">
        {<StoryVoteButton className="completed_stories_delete_btn"
                         buttonText={<img src={deleteStoryIcon}
                                          alt="deleteStoryIcon"
                                          width="14" height="18"/>}
                         onClick={handleDelete}/>}
      </td>
    </tr>
  );
};

export default CompletedStoryRow;


