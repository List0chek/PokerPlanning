import React from "react";
import MainHeader from "../../MainHeader/mainHeader";
import Footer from "../../Footer/footer";
import Board from "../../Board/board";
import StoryVote from "../../StoryVoteCompletedBlock/storyVote";
import CompletedStories from "../../CompletedStories/completedStories";

const cardData = ["0", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "?", "∞", "coffee"];
const usersData = [
  {
    username: "testtesttesttesttesttest 1",
    isChecked: true
  },
  {
    username: "test 2",
    isChecked: false
  },
  {
    username: "test 3",
    isChecked: true
  }
];

const completedStoriesData = [
  {
    storyName: "Very very very long story",
    avgVote: "14141414141414",
  },
  {
    storyName: "Story",
    avgVote: "14",
  },
  {
    storyName: "Story",
    avgVote: "14",
  }
];

const PlanningPage = () => {
  return (
    <>
      <MainHeader isAuth={true}/>
      <main className="main_main">
        <p className="main_block_name">Choose card:</p>
        <div className="main_block">
          <Board cardValues={cardData}/>
          {/*<StoryVote playersList={usersData}
                     buttonText={"Finish voting"}
                     url={"http://localhost:63342/client/src/html/InvitePage.html"}/>*/}
        </div>
        {/*<CompletedStories completedStoriesCount={"5"} completedStoriesList={completedStoriesData}/>*/}
      </main>
      <Footer/>
    </>
  );
}

export default PlanningPage;
