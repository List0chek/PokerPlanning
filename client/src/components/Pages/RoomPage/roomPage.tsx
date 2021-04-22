import React from "react";
import MainHeader from "../../MainHeader/mainHeader";
import Footer from "../../Footer/footer";
import Board from "../../Board/board";
import StoryVote from "../../StoryVoteCompletedBlock/storyVote";
import CompletedStories from "../../CompletedStories/completedStories";
import Modal from "../Modal/modal";
import StoryVoteResult from "../../StoryVoteResult/storyVoteResult";
import CreateNewDiscussion from "../../StoryVoteCompletedBlock/CreateNewDiscussion/createNewDiscussionBlock";

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
    storyName: "Very very very long story 1",
    avgVote: "14141414141414",
  },
  {
    storyName: "Story 2",
    avgVote: "14",
  },
  {
    storyName: "Story 3",
    avgVote: "14",
  }
];

const storyDetailsData = [
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

interface IProps {
  isChecked?: boolean;
}

interface IState {
  discussionState: number;
  discussionName: string;
  downloadStories: number;
}

class RoomPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      discussionState: 0,
      discussionName: "Story",
      downloadStories: 0
    };
    this.handleEnterButtonClick = this.handleEnterButtonClick.bind(this);
    this.handleGoButtonClick = this.handleGoButtonClick.bind(this);
    this.handleDownloadButtonClick = this.handleDownloadButtonClick.bind(this);
  }

  public handleEnterButtonClick(value: number) {
    this.setState({
      discussionState: value + 1
    })
  }

  public handleGoButtonClick(state: number, value: string) {
    this.setState({
      discussionState: 0,
      discussionName: value
    })
  }

  public handleDownloadButtonClick(value: number) {
    this.setState({
      downloadStories: value
    })
  }

  public render() {
    const {discussionState} = this.state;
    const {discussionName} = this.state;
    return (
      <>
        <MainHeader isAuth={true}/>
        <main className="main_main">
          <p className="main_block_name">{discussionName}</p>
          <div className="main_block">
            {discussionState == 0 ?
              <Board cardValues={cardData}/> : <StoryVoteResult playersCount={"3"}
                                                                avgVote={"4"}
                                                                storyVoteResultInfoValues={storyVoteResultInfoData}/>}

            <StoryVote playersList={usersData}
                       url={"http://localhost:63342/client/src/html/InvitePage.html"}
                       onStoryVoteButtonClick={discussionState <= 1 ? this.handleEnterButtonClick : this.handleGoButtonClick}
                       discussionState={discussionState}
                       discussionName={discussionName}/>
          </div>
          <CompletedStories completedStoriesCount={"5"} completedStoriesList={completedStoriesData}
                            onDownload={this.handleDownloadButtonClick}/>
        </main>
        {/* <Modal playersList={storyDetailsData}/>*/}
        <Footer/>
      </>
    );
  }
}

export default RoomPage;
