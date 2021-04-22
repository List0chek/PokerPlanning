import React from "react";
import downloadStoriesIcon from "../../images/download_24px.svg";
import StoryVoteButton from "../StoryVoteButton/storyVoteButton";
import CompletedStoryRow from "./CompletedStoryRow/completedStoryRow";
import "./completedStories.css";

interface IProps {
  completedStoriesCount: string;
  completedStoriesList: Array<any>;

  onDownload(value: number): void;
}

const CompletedStories: React.FunctionComponent<IProps> = (props) => {

  const handleDownload = () => {
    props.onDownload(+ 1);
  };

  return (
    <div className="completed_stories">
      <header className="completed_stories_header">
        <div className="completed_stories_text_and_amount_icon">
          Completed Stories
          <div className="completed_stories_amount_icon">
            <span className="completed_stories_amount_icon_stories_count">{props.completedStoriesCount}</span>
          </div>
        </div>
        {<StoryVoteButton className="completed_stories_download_btn"
                          buttonText={<img id="download_stories_icon"
                                           src={downloadStoriesIcon}
                                           alt="downloadStoriesIcon"
                                           width="14"
                                           height="17"/>}
                          onClick={handleDownload}/>}
      </header>
      <div>
        <table className="players_table">
          <tbody>
          {props.completedStoriesList.map((array) => {
            return <CompletedStoryRow key={array.storyName}
                                      storyName={array.storyName}
                                      avgVote={array.avgVote}
                                      onDelete={handleDownload}/>;
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedStories;

