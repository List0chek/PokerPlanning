import React from "react";
import "./searchBlock.css";


const StoryVoteSearchBlock = () => {
  return (
    <div className="story_vote_go_search_block">
      <input className="story_vote_go_textbox" type="text" name="goto" id="goto" placeholder="Enter something" required />
        <button className="go_btn" type="submit">Go</button>
    </div>
  );
};

export default StoryVoteSearchBlock;
