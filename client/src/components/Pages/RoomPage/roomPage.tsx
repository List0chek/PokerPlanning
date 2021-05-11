import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import Board from '../../Board/board';
import DiscussionController from '../../DiscussionControllerBlock/discussionController';
import CompletedStories from '../../CompletedStories/completedStories';
import Modal from '../Modal/modal';
import StoryVoteResult from '../../StoryVoteResult/storyVoteResult';
import { IStoryVoteResultInfoRowProps } from '../../StoryVoteResult/VoteValueResultInfo/storyVoteResultInfo';
import { ICard, IDiscussion, IRoom, IRootState, IUser, IVote } from '../../../Store/types';
import history from '../../../services/history-service';
import { RoutePath } from '../../routes';
import * as api from '../../../api/api';
import { updateRoom } from '../../../Store/room/room-action-creators';
import { updateDiscussion } from '../../../Store/discussion/discussion-action-creators';
import { toggleLoadingIndicator } from '../../../Store/loading/loading-action-creators';
import { updateUser } from '../../../Store/user/user-action-creators';
import authService from '../../../services/auth-service';
import '../Modal/modal.css';

interface IMatchParams {
  id: string;
}

export interface IRoomPageProps extends RouteComponentProps<IMatchParams> {
  room: IRoom;
  user: IUser;
  discussion: IDiscussion;
  setVote(discussionId: string, userId: string, cardId: string): void;
  getRoomInfo(roomId: string, userId: string): Promise<IRoom>;
  getDiscussionInfo(discussionId: string, userId: string): Promise<IDiscussion>;
  closeDiscussion(roomId: string, discussionId: string, userId: string): Promise<IDiscussion>;
  createDiscussion(roomId: string, topicName: string, userId: string): Promise<IDiscussion>;
  getUser(): Promise<IUser>;
  deleteDiscussion(roomId: string, discussionId: string, userId: string): void;
}

interface IState {
  isDiscussionClosed: boolean;
  isModalOpen: boolean;
  openedStoryId: string;
  discussionNames: string /*TODO: потом будет массив discussionId*/;
  storyVoteResultInfoData: Array<IStoryVoteResultInfoRowProps>;
}

class RoomPage extends React.Component<IRoomPageProps, IState> {
  constructor(props: IRoomPageProps) {
    super(props);
    this.state = {
      isDiscussionClosed: false,
      isModalOpen: false,
      openedStoryId: '',
      discussionNames: '',
      storyVoteResultInfoData: [],
    };
    this.handleEnterButtonClick = this.handleEnterButtonClick.bind(this);
    this.handleGoButtonClick = this.handleGoButtonClick.bind(this);
    this.handleCompletedStoryClick = this.handleCompletedStoryClick.bind(this);
    this.handleStoryDetailsDeleteButtonClick = this.handleStoryDetailsDeleteButtonClick.bind(this);
    this.handleStoryDetailsCloseButtonClick = this.handleStoryDetailsCloseButtonClick.bind(this);
    this.handleStoryDetailsDownloadButtonClick = this.handleStoryDetailsDownloadButtonClick.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }
  public static timer: NodeJS.Timeout;
  public async componentDidMount() {
    if (authService.get() === '') {
      history.push(`${RoutePath.INVITE}/${this.props.match.params.id}`);
    }

    if (this.props.user == null) {
      await this.props.getUser();
    }

    if (this.props.room == null && this.props.user) {
      await this.props.getRoomInfo(this.props.match.params.id, this.props.user.id);
    }

    if (this.props.discussion == null && this.props.room && this.props.user) {
      const currentDiscussionIndex = this.props.room.discussions.length - 1;
      await this.props.getDiscussionInfo(this.props.room.discussions[currentDiscussionIndex].id, this.props.user.id);
    }
    RoomPage.timer = setInterval(async () => {
      await this.props.getRoomInfo(this.props.room.id, this.props.user.id);
      const currentDiscussionIndex = this.props.room.discussions.length - 1;
      if (currentDiscussionIndex >= 0) {
        console.log(currentDiscussionIndex);
        await this.props.getDiscussionInfo(this.props.room.discussions[currentDiscussionIndex].id, this.props.user.id);
      }
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(RoomPage.timer);
  }

  public async handleVote(value: ICard) {
    await this.props.setVote(this.props.discussion.id, this.props.user.id, value.id);
    await this.props.getRoomInfo(this.props.room.id, this.props.user.id);
    await this.props.getDiscussionInfo(this.props.discussion.id, this.props.user.id);
  }

  public updatedStoryVoteResultInfoData = (s: Array<IStoryVoteResultInfoRowProps>) => {
    const currentDiscussion = this.props.room.discussions[this.props.room.discussions.length - 1];
    const votes = currentDiscussion ? currentDiscussion.votes : [];
    for (let i = 0; i < votes.length; i++) {
      const newStoryVoteResultInfoData: IStoryVoteResultInfoRowProps = {
        className: `vote_value_dot_${[i]}`,
        voteValueMark: votes[i].card.value,
        playersCount: votes.filter((item: IVote) => item.card.value === votes[i].card.value).length,
        playersPercentagePerVote: (
          (votes.filter((item: IVote) => item.card.value === votes[i].card.value).length / votes.length) *
          100
        ).toString(),
      };
      const voteValueDuplicate = s.find((s) => s.voteValueMark === votes[i].card.value);
      if (!voteValueDuplicate) s.push(newStoryVoteResultInfoData);
    }
    return s;
  };

  public async handleEnterButtonClick() {
    if (this.props.discussion.dateEnd === null) {
      await this.props.closeDiscussion(this.props.room.id, this.props.discussion.id, this.props.user.id);
      await this.props.getRoomInfo(this.props.room.id, this.props.user.id);
    }

    this.setState({
      isDiscussionClosed: true,
      storyVoteResultInfoData: this.updatedStoryVoteResultInfoData(this.state.storyVoteResultInfoData),
    });
  }

  public async handleGoButtonClick(value: string) {
    await this.props.createDiscussion(this.props.room.id, value, this.props.user.id);
    await this.props.getRoomInfo(this.props.room.id, this.props.user.id);
    this.setState({
      isDiscussionClosed: false,
      storyVoteResultInfoData: [],
    });
  }

  public handleCompletedStoryClick(discussionId: string) {
    this.setState({
      isModalOpen: true,
      openedStoryId: discussionId,
    });
  }

  public handleStoryDetailsCloseButtonClick() {
    this.setState({
      isModalOpen: false,
      openedStoryId: '',
    });
  }

  public async handleStoryDetailsDeleteButtonClick(discussionId: string) {
    await this.props.deleteDiscussion(this.props.room.id, discussionId, this.props.user.id);
    await this.props.getRoomInfo(this.props.room.id, this.props.user.id);
  }

  public handleStoryDetailsDownloadButtonClick() {
    return;
  }

  public render() {
    const { isDiscussionClosed, isModalOpen, storyVoteResultInfoData, openedStoryId } = this.state;
    const { room, discussion } = this.props;
    const discussionInModal = room.discussions.find((item) => item.id === openedStoryId);
    return (
      <>
        <main className='main_main'>
          <p className='main_block_name'>{discussion.topic}</p>
          <div className='main_block'>
            {!isDiscussionClosed && discussion.dateEnd === null ? (
              <Board cardValues={room.deck.cards} onCardChange={this.handleVote} />
            ) : (
              <StoryVoteResult
                playersCount={discussion.votes.length.toString()}
                avgVote={discussion.averageResult ? discussion.averageResult.toString() : '0'}
                storyVoteResultInfoValues={storyVoteResultInfoData}
              />
            )}
            <DiscussionController
              playersListBeforeDiscussionClosed={room.members}
              playersListAfterDiscussionClosed={discussion.votes}
              url={window.location.href}
              onEnterButtonClick={this.handleEnterButtonClick}
              onGoButtonClick={this.handleGoButtonClick}
              isDiscussionClosed={isDiscussionClosed}
              discussionName={discussion.topic}
            />
          </div>
          <CompletedStories
            completedStoriesList={room.discussions.filter((item) => item.dateEnd != null)}
            onCompletedStoryClick={this.handleCompletedStoryClick}
            onDelete={this.handleStoryDetailsDeleteButtonClick}
            onDownload={this.handleStoryDetailsDownloadButtonClick}
          />
        </main>
        {isModalOpen && (
          <Modal
            playersList={discussionInModal ? discussionInModal.votes : []}
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
    discussion: state.discussion,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setVote: async (discussionId: string, userId: string, cardId: string) => {
      dispatch(toggleLoadingIndicator(true));
      try {
        await api.setVoteRequest(discussionId, userId, cardId);
      } finally {
        dispatch(toggleLoadingIndicator(false));
      }
    },
    getUser: async () => {
      const response = await api.getUserRequest();
      if (response) dispatch(updateUser(response));
      return response;
    },
    getRoomInfo: async (roomId: string, userId: string) => {
      const response = await api.getRoomInfoRequest(roomId, userId);
      if (response) dispatch(updateRoom(response));
      return response;
    },
    getDiscussionInfo: async (discussionId: string, userId: string) => {
      const response = await api.getDiscussionInfoRequest(discussionId, userId);
      if (response) dispatch(updateDiscussion(response));
      return response;
    },
    closeDiscussion: async (roomId: string, discussionId: string, userId: string) => {
      dispatch(toggleLoadingIndicator(true));
      try {
        const response = await api.closeDiscussionRequest(roomId, discussionId, userId);
        dispatch(updateDiscussion(response));
        return response;
      } finally {
        dispatch(toggleLoadingIndicator(false));
      }
    },
    createDiscussion: async (roomId: string, topicName: string, userId: string) => {
      dispatch(toggleLoadingIndicator(true));
      try {
        const response = await api.createDiscussionRequest(roomId, topicName, userId);
        dispatch(updateDiscussion(response));
        return response;
      } finally {
        dispatch(toggleLoadingIndicator(false));
      }
    },
    deleteDiscussion: async (roomId: string, discussionId: string, userId: string) => {
      dispatch(toggleLoadingIndicator(true));
      try {
        await api.deleteDiscussionRequest(roomId, discussionId, userId);
      } finally {
        dispatch(toggleLoadingIndicator(false));
      }
    },
  };
};

export default compose<React.ComponentClass>(withRouter, connect(mapStateToProps, mapDispatchToProps))(RoomPage);
