import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import Board from '../../Board/board';
import DiscussionController from '../../DiscussionControllerBlock/discussionController';
import CompletedStories, { ICompletedStory } from '../../CompletedStories/completedStories';
import Modal from '../Modal/modal';
import StoryVoteResult from '../../StoryVoteResult/storyVoteResult';
import { IStoryVoteResultInfoRowProps } from '../../StoryVoteResult/VoteValueResultInfo/storyVoteResultInfo';
import { IPlayerRowProps } from '../../DiscussionControllerBlock/PlayersRow/playerRow';
import { ICard, IRoom, IRootState, IUser } from '../../../Store/types';
import { vote } from '../../../Store/room/room-action-creators';
import '../Modal/modal.css';

interface IMatchParams {
  id: string;
}

export interface IMainPageProps extends RouteComponentProps<IMatchParams> {
  room: IRoom;
  user: IUser;
  vote(roomId: string, discussionId: string, user: IUser, card: ICard): void;
}

interface IState {
  nameOfCurrentUser: string;
  isDiscussionClosed: boolean;
  discussionName: string;
  deleteDiscussion: string /*TODO: потом будет discussionId*/;
  isModalOpen: boolean;
  openedStory: string;
  discussionNames: string /*TODO: потом будет массив discussionId*/;
  usersData: Array<IPlayerRowProps>;
  storyVoteResultInfoData: Array<IStoryVoteResultInfoRowProps>;
  completedStoriesData: Array<ICompletedStory>;
  isCardChecked: boolean;
}

class RoomPage extends React.Component<IMainPageProps, IState> {
  constructor(props: IMainPageProps) {
    super(props);
    this.state = {
      nameOfCurrentUser: 'userName 1',
      isDiscussionClosed: false,
      isCardChecked: false,
      discussionName: 'topicName1',
      deleteDiscussion: '',
      isModalOpen: false,
      openedStory: '',
      discussionNames: '',
      usersData: [],
      storyVoteResultInfoData: [],
      completedStoriesData: [
        {
          storyName: 'Story 1',
          avgVote: '14',
          usersData: [],
        },
      ],
    };
    this.handleEnterButtonClick = this.handleEnterButtonClick.bind(this);
    this.handleGoButtonClick = this.handleGoButtonClick.bind(this);
    this.handleCompletedStoryClick = this.handleCompletedStoryClick.bind(this);
    this.handleStoryDetailsDeleteButtonClick = this.handleStoryDetailsDeleteButtonClick.bind(this);
    this.handleStoryDetailsCloseButtonClick = this.handleStoryDetailsCloseButtonClick.bind(this);
    this.handleStoryDetailsDownloadButtonClick = this.handleStoryDetailsDownloadButtonClick.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  public handleVote(value: ICard) {
    this.props.vote(this.props.match.params.id, '456', this.props.user, value);
    console.log(this.props.user.id);
    this.setState({
      isCardChecked: true,
    });
  }

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
          voteValueMark: updatedUsersData[i].card.value,
          playersCount: updatedUsersData.filter((item) => item.card.value === updatedUsersData[i].card.value).length,
          playersPercentagePerVote: (
            (updatedUsersData.filter((item) => item.card.value === updatedUsersData[i].card.value).length /
              updatedUsersData.length) *
            100
          ).toString(),
        };
        const voteValueDuplicate = s.find((s) => s.voteValueMark === updatedUsersData[i].card.value);
        if (!voteValueDuplicate) s.push(newStoryVoteResultInfoData);
      }
      return s;
    };

    const newCompletedStory: ICompletedStory = {
      storyName: this.state.discussionName,
      avgVote: (
        updatedUsersData.reduce((votesSum: number, item) => votesSum + parseInt(item.card.value, 10), 0) /
        updatedUsersData.length
      ).toString(),
      usersData: updatedUsersData,
    };

    const storyDuplicate = this.state.completedStoriesData.find((s) => s.storyName === this.state.discussionName);
    if (storyDuplicate) return;
    const updatedCompletedStoriesData = [...this.state.completedStoriesData, newCompletedStory];

    this.setState({
      isDiscussionClosed: true,
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
      isDiscussionClosed: false,
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
      isDiscussionClosed,
      discussionName,
      isModalOpen,
      storyVoteResultInfoData,
      completedStoriesData,
      isCardChecked,
    } = this.state;
    const { room } = this.props;
    const playersCount = this.state.usersData.filter((item) => item.user.name).length;
    const votesSum = this.state.usersData.reduce(
      (votesSum: number, item) => votesSum + parseInt(item.card.value, 10),
      0
    );

    return (
      <>
        <main className='main_main'>
          <p className='main_block_name'>{discussionName}</p>
          <div className='main_block'>
            {!isDiscussionClosed ? (
              <Board cardValues={room.deck.cards} onCardChange={this.handleVote} />
            ) : (
              <StoryVoteResult
                playersCount={playersCount.toString()}
                avgVote={(votesSum / playersCount).toString()}
                storyVoteResultInfoValues={storyVoteResultInfoData}
              />
            )}
            <DiscussionController
              playersList={room.discussions.find((item) => item.topic === discussionName)!.votes}
              url={window.location.href}
              onEnterButtonClick={this.handleEnterButtonClick}
              onGoButtonClick={this.handleGoButtonClick}
              isDiscussionClosed={isDiscussionClosed}
              discussionName={discussionName}
              isCardChecked={isCardChecked}
            />
          </div>
          <CompletedStories
            completedStoriesList={completedStoriesData}
            onCompletedStoryClick={this.handleCompletedStoryClick}
            onDelete={this.handleStoryDetailsDeleteButtonClick}
            onDownload={this.handleStoryDetailsDownloadButtonClick}
          />
        </main>
        {isModalOpen && (
          <Modal
            playersList={room.discussions.find((item) => item.topic === discussionName)!.votes}
            onStoryDetailsCloseButtonClick={this.handleStoryDetailsCloseButtonClick}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    room: state.room,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    vote: (roomId: string, discussionId: string, user: IUser, card: ICard) =>
      dispatch(vote(roomId, discussionId, user, card)),
  };
};

export default compose<React.ComponentClass>(withRouter, connect(mapStateToProps, mapDispatchToProps))(RoomPage);
