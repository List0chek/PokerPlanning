import React from "react";
import MainHeader from "../../MainHeader/mainHeader";
import Footer from "../../Footer/footer";
import StoryVote from "../../StoryVoteCompletedBlock/storyVote";
import StoryVoteResult from "../../StoryVoteResult/storyVoteResult";
import CompletedStories from "../../CompletedStories/completedStories";

const cardData = ["0", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "?", "∞", "coffee"];

const usersData = [
  {
    username: "testtesttesttesttesttest 1",
    value: "3"
  },
  {
    username: "test 2",
    value: "3"
  },
  {
    username: "test 3",
    value: "5"
  }
];

const storyVoteResultInfoData = [
  {
    className: "vote_value_dot_1",
    voteValueMark: "3",
    playersCount: "2",
    playersPercentage: "66,6",
  },
  {
    className: "vote_value_dot_2",
    voteValueMark: "5",
    playersCount: "1",
    playersPercentage: "33,3",
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

const ResultPage = () => {
  return (
    <>
      <MainHeader isAuth={true}/>
      <main className="main_main">
        <p className="main_block_name">Choose card:</p>
        <div className="main_block">
          <StoryVoteResult playersCount={"3"} avgVote={"4"} storyVoteResultInfoValues={storyVoteResultInfoData}/>
          {/*<StoryVote playersList={usersData}
                     buttonText={"Next"}
                     url={"http://localhost:63342/client/src/html/InvitePage.html"}/>*/}
        </div>
        {/*<CompletedStories completedStoriesCount={"5"} completedStoriesList={completedStoriesData}/>*/}
      </main>
      <Footer/>
    </>
  );
}

export default ResultPage;
