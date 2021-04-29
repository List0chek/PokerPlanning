import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import MainHeader from '../../MainHeader/mainHeader';
import Footer from '../../Footer/footer';
import Board from '../../Board/board';
import StoryVote from '../../StoryVoteCompletedBlock/storyVote';
import CompletedStories, { ICompletedStory } from '../../CompletedStories/completedStories';
import Modal from '../Modal/modal';
import StoryVoteResult from '../../StoryVoteResult/storyVoteResult';
import { IStoryVoteResultInfoRowProps } from '../../StoryVoteResult/VoteValueResultInfo/storyVoteResultInfo';
import { IPlayerRowProps } from '../../StoryVoteCompletedBlock/PlayersRow/playerRow';
import '../Modal/modal.css';

/*const usersData = [
  {
    username: 'testtesttesttesttesttest 1',
    isChecked: false,
  },
  {
    username: 'test 2',
    isChecked: false,
  },
  {
    username: 'test 3',
    isChecked: false,
  },
];*/

/*const completedStoriesData = [
  {
    storyName: 'Very very very long story 1',
    avgVote: '14141414141414',
  },
  {
    storyName: 'Story 2',
    avgVote: '14',
  },
  {
    storyName: 'Story 3',
    avgVote: '14',
  },
];

const storyDetailsData = [
  {
    username: 'testtesttesttesttesttest 1',
    value: '3',
  },
  {
    username: 'test 2',
    value: '3',
  },
  {
    username: 'test 3',
    value: '5',
  },
];*/

/*const storyVoteResultInfoData = [
  {
    className: 'vote_value_dot_1',
    voteValueMark: '3',
    playersCount: '2',
    playersPercentage: '66,6',
  },
  {
    className: 'vote_value_dot_2',
    voteValueMark: '5',
    playersCount: '1',
    playersPercentage: '33,3',
  },
];*/

interface IMatchParams {
  id: string;
}

interface IState {
  nameOfCurrentUser: string;
  isClosed: boolean;
  discussionName: string;
  deleteDiscussion: string /*TODO: потом будет discussionId*/;
  isModalOpen: boolean;
  openedStory: string;
  discussionNames: string /*TODO: потом будет массив discussionId*/;
  cardData: Array<string>;
  usersData: Array<IPlayerRowProps>;
  storyVoteResultInfoData: Array<IStoryVoteResultInfoRowProps>;
  completedStoriesData: Array<ICompletedStory>;
}

class RoomPage extends React.Component<RouteComponentProps<IMatchParams>, IState> {
  constructor(props: RouteComponentProps<IMatchParams>) {
    super(props);
    this.state = {
      nameOfCurrentUser: 'userName 1',
      isClosed: false,
      discussionName: 'Story',
      deleteDiscussion: '',
      isModalOpen: false,
      openedStory: '',
      discussionNames: '',
      cardData: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?', '∞', '☕'],
      usersData: [
        { username: 'userName 1', value: '', isChecked: false, isClosed: false },
        { username: 'userName 2', value: '2', isChecked: true, isClosed: false },
        { username: 'userName 3', value: '55', isChecked: true, isClosed: false },
        { username: 'userName 4', value: '13', isChecked: true, isClosed: false },
        { username: 'userName 5', value: '13', isChecked: true, isClosed: false },
      ],
      storyVoteResultInfoData: [],
      completedStoriesData: [
        {
          storyName: 'Story 1',
          avgVote: '14',
          usersData: [{ username: 'test 1', value: '14', isChecked: true, isClosed: true }],
        },
      ],
    };
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleEnterButtonClick = this.handleEnterButtonClick.bind(this);
    this.handleGoButtonClick = this.handleGoButtonClick.bind(this);
    this.handleCompletedStoryClick = this.handleCompletedStoryClick.bind(this);
    this.handleStoryDetailsDeleteButtonClick = this.handleStoryDetailsDeleteButtonClick.bind(this);
    this.handleStoryDetailsCloseButtonClick = this.handleStoryDetailsCloseButtonClick.bind(this);
    this.handleStoryDetailsDownloadButtonClick = this.handleStoryDetailsDownloadButtonClick.bind(this);
  }

  public handleCardChange = (value: string) => {
    const updatedUsersData = this.state.usersData.map((s) => {
      if (s.username === this.state.nameOfCurrentUser) {
        return {
          ...s,
          isChecked: true,
          value: value,
          isClosed: this.state.isClosed,
        };
      }
      return s;
    });

    this.setState({
      usersData: updatedUsersData,
    });
  };

  public handleEnterButtonClick() {
    const updatedUsersData = this.state.usersData.map((s) => {
      return {
        ...s,
        isClosed: true,
      };
    });

    const updatedStoryVoteResultInfoData = (s: Array<IStoryVoteResultInfoRowProps>) => {
      for (let i = 0; i < updatedUsersData.length; i++) {
        const newStoryVoteResultInfoData: IStoryVoteResultInfoRowProps = {
          className: `vote_value_dot_${[i]}`,
          voteValueMark: updatedUsersData[i].value,
          playersCount: updatedUsersData.filter((item) => item.value === updatedUsersData[i].value).length,
          playersPercentagePerVote: (
            (updatedUsersData.filter((item) => item.value === updatedUsersData[i].value).length /
              updatedUsersData.length) *
            100
          ).toString(),
        };
        const voteValueDuplicate = s.find((s) => s.voteValueMark === updatedUsersData[i].value);
        if (!voteValueDuplicate) s.push(newStoryVoteResultInfoData);
      }
      return s;
    };

    const newCompletedStory: ICompletedStory = {
      storyName: this.state.discussionName,
      avgVote: (
        updatedUsersData.reduce((votesSum: number, item) => votesSum + parseInt(item.value, 10), 0) /
        updatedUsersData.length
      ).toString(),
      usersData: updatedUsersData,
    };

    const storyDuplicate = this.state.completedStoriesData.find((s) => s.storyName === this.state.discussionName);
    if (storyDuplicate) return;
    const updatedCompletedStoriesData = [...this.state.completedStoriesData, newCompletedStory];

    this.setState({
      isClosed: true,
      completedStoriesData: updatedCompletedStoriesData,
      usersData: updatedUsersData,
      storyVoteResultInfoData: updatedStoryVoteResultInfoData(this.state.storyVoteResultInfoData),
    });
  }

  public handleGoButtonClick(value: string) {
    const updatedUsersData = this.state.usersData.map((s) => {
      return {
        ...s,
        isChecked: undefined,
        value: '',
        isClosed: false,
      };
    });

    this.setState({
      isClosed: false,
      discussionName: value,
      usersData: updatedUsersData,
      storyVoteResultInfoData: [],
    });
  }

  public handleCompletedStoryClick(storyName: string) {
    this.setState({
      isModalOpen: true,
      openedStory: storyName,
    });
  }

  public handleStoryDetailsCloseButtonClick() {
    this.setState({
      isModalOpen: false,
      openedStory: '',
    });
  }

  public handleStoryDetailsDeleteButtonClick(value: string) {
    const updatedCompletedStoriesData = this.state.completedStoriesData.filter((s) => s.storyName !== value);
    this.setState({
      deleteDiscussion: value,
      completedStoriesData: updatedCompletedStoriesData,
    });
  }

  public handleStoryDetailsDownloadButtonClick() {
    this.setState({
      discussionNames: 'discussionIdArray',
    });
  }

  public render() {
    const {
      isClosed,
      discussionName,
      isModalOpen,
      cardData,
      usersData,
      storyVoteResultInfoData,
      completedStoriesData,
      openedStory,
    } = this.state;
    const playersCount = this.state.usersData.filter((item) => item.username).length;
    const votesSum = this.state.usersData.reduce((votesSum: number, item) => votesSum + parseInt(item.value, 10), 0);

    return (
      <>
        <MainHeader isAuth={true} />
        <main className='main_main'>
          <p className='main_block_name'>{discussionName}</p>
          <div className='main_block'>
            {!isClosed ? (
              <Board cardValues={cardData} onCardChange={this.handleCardChange} />
            ) : (
              <StoryVoteResult
                playersCount={playersCount.toString()}
                avgVote={(votesSum / playersCount).toString()}
                storyVoteResultInfoValues={storyVoteResultInfoData}
              />
            )}

            <StoryVote
              playersList={usersData}
              url={window.location.href}
              onStoryVoteButtonClick={this.handleEnterButtonClick}
              onGoButtonClick={this.handleGoButtonClick}
              isClosed={isClosed}
              discussionName={discussionName}
            />
          </div>
          <CompletedStories
            completedStoriesList={completedStoriesData}
            onCompletedStoryClick={this.handleCompletedStoryClick}
            onDelete={this.handleStoryDetailsDeleteButtonClick}
            onDownload={this.handleStoryDetailsDownloadButtonClick}
          />
        </main>
        <Footer />
        {isModalOpen && (
          <Modal
            playersList={completedStoriesData.find((item) => item.storyName === openedStory)!.usersData}
            onStoryDetailsCloseButtonClick={this.handleStoryDetailsCloseButtonClick}
          />
        )}
      </>
    );
  }
}

export default withRouter(RoomPage);
