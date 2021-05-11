import React from 'react';
import { RouteComponentProps } from 'react-router';
import Board from '../../Board/board';
import DiscussionController from '../../DiscussionControllerBlock/discussionController';
import CompletedStories from '../../CompletedStories/completedStories';
import Modal from '../Modal/modal';
import StoryVoteResult from '../../StoryVoteResult/storyVoteResult';
import { IStoryVoteResultInfoRowProps } from '../../StoryVoteResult/VoteValueResultInfo/storyVoteResultInfo';
import { ICard, IDiscussion, IRoom, IUser, IVote } from '../../../Store/types';
import history from '../../../services/history-service';
import { RoutePath } from '../../routes';
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

class RoomPageView extends React.Component<IRoomPageProps, IState> {
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
    if (localStorage.getItem('token') === '') {
      history.push(`${RoutePath.INVITE}/${this.props.match.params.id}`);
    } else if (this.props.user == null) {
      await this.props.getUser();
    } else if (this.props.room == null && this.props.user) {
      await this.props.getRoomInfo(this.props.match.params.id, this.props.user.id);
    } else if (this.props.discussion == null && this.props.room && this.props.user) {
      const currentDiscussionIndex = this.props.room.discussions.length - 1;
      if (currentDiscussionIndex >= 0) {
        await this.props.getDiscussionInfo(this.props.room.discussions[currentDiscussionIndex].id, this.props.user.id);
      }
    }

    RoomPageView.timer = setInterval(async () => {
      await this.props.getUser();
      await this.props.getRoomInfo(this.props.room.id, this.props.user.id);
      const currentDiscussionIndex = this.props.room.discussions.length - 1;
      if (currentDiscussionIndex >= 0) {
        await this.props.getDiscussionInfo(this.props.room.discussions[currentDiscussionIndex].id, this.props.user.id);
      }
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(RoomPageView.timer);
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
    if (this.props.user && this.props.room && this.props.discussion) {
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
    } else return null;
  }
}

export default RoomPageView;
