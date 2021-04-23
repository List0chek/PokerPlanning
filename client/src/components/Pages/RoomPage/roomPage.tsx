import React from "react";
import MainHeader from "../../MainHeader/mainHeader";
import Footer from "../../Footer/footer";
import Board from "../../Board/board";
import StoryVote from "../../StoryVoteCompletedBlock/storyVote";
import CompletedStories from "../../CompletedStories/completedStories";
import Modal from "../Modal/modal";
import StoryVoteResult from "../../StoryVoteResult/storyVoteResult";
import CreateNewDiscussionControl from "../../StoryVoteCompletedBlock/CreateNewDiscussion/createNewDiscussionBlock";
import "../Modal/modal.css";

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
  deleteDiscussion: string; /*TODO: потом будет discussionId*/
  isModalOpen: boolean;
  openedStory: string;
  discussionNames: string; /*TODO: потом будет массив discussionId*/
}

class RoomPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      discussionState: 0,
      discussionName: "Story",
      deleteDiscussion: "",
      isModalOpen: false,
      openedStory: "",
      discussionNames: ""
    };
    this.handleEnterButtonClick = this.handleEnterButtonClick.bind(this);
    this.handleGoButtonClick = this.handleGoButtonClick.bind(this);
    this.handleStoryDetailsDeleteButtonClick = this.handleStoryDetailsDeleteButtonClick.bind(this);
    this.handleStoryDetailsCloseButtonClick = this.handleStoryDetailsCloseButtonClick.bind(this);
    this.handleStoryDetailsDownloadButtonClick = this.handleStoryDetailsDownloadButtonClick.bind(this);
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

  public handleCompletedStoryClick(storyName: string) {
    this.setState({
      isModalOpen: true,
      openedStory: storyName
    })
  }

  public handleStoryDetailsCloseButtonClick() {
    this.setState({
      isModalOpen: false,
      openedStory: ""
    })
  }

  public handleStoryDetailsDeleteButtonClick(value: string) {
    this.setState({
      deleteDiscussion: value
    })
  }

  public handleStoryDetailsDownloadButtonClick(value: string) {
    this.setState({
      discussionNames: "discussionIdArray"
    })
  }

  public render() {
    const {discussionState} = this.state;
    const {discussionName} = this.state;
    const {isModalOpen} = this.state;
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
                            onCompletedStoryClick={this.handleCompletedStoryClick}
                            onDelete={this.handleStoryDetailsDeleteButtonClick}
                            onDownload={() => this.handleStoryDetailsDownloadButtonClick(this.state.discussionNames)}/>
        </main>
        <Footer/>
        {isModalOpen && <Modal playersList={storyDetailsData}
                               onStoryDetailsCloseButtonClick={this.handleStoryDetailsCloseButtonClick}/>}
      </>
    );
  }
}

export default RoomPage;
