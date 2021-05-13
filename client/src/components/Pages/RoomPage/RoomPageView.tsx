import React from 'react';
import { RouteComponentProps } from 'react-router';
import Board from '../../Board/Board';
import DiscussionController from '../../DiscussionControllerBlock/DiscussionController';
import CompletedStories from '../../CompletedStories/CompletedStories';
import Modal from '../Modal/Modal';
import StoryVoteResult from '../../StoryVoteResult/StoryVoteResult';
import { IStoryVoteResultInfoRowProps } from '../../StoryVoteResult/VoteValueResultInfo/StoryVoteResultInfo';
import { ICard, IError, IRoom, IUser, IVote } from '../../../store/Types';
import history from '../../../services/HistoryService';
import { RoutePath } from '../../Routes';
import '../Modal/Modal.css';

interface IMatchParams {
  id: string;
}

export interface IRoomPageProps extends RouteComponentProps<IMatchParams> {
  room: IRoom;
  user: IUser | null;
  error: IError | null;
  setVote(discussionId: string, userId: string, cardId: string): Promise<IRoom>;
  loadRoomInfo(roomId: string, userId: string): Promise<IRoom>;
  closeDiscussion(roomId: string, discussionId: string, userId: string): Promise<IRoom>;
  createDiscussion(roomId: string, topicName: string, userId: string): Promise<IRoom>;
  loadUser(): Promise<IUser>;
  deleteDiscussion(roomId: string, discussionId: string, userId: string): Promise<IRoom>;
  addMemberToRoom(roomId: string, userId: string): Promise<IRoom>;
}

interface IState {
  isModalOpen: boolean;
  openedDiscussionId: string;
}

class RoomPageView extends React.Component<IRoomPageProps, IState> {
  constructor(props: IRoomPageProps) {
    super(props);
    this.state = {
      isModalOpen: false,
      openedDiscussionId: '',
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
    try {
      await this.props.loadUser();
    } catch (error: any) {
      history.push(`${RoutePath.INVITE}/${this.props.match.params.id}`);
    }

    if (this.props.room == null && this.props.user) {
      await this.props.addMemberToRoom(this.props.match.params.id, this.props.user.id);
      await this.props.loadRoomInfo(this.props.match.params.id, this.props.user.id);
    }

    RoomPageView.timer = setInterval(async () => {
      if (this.props.user) await this.props.loadRoomInfo(this.props.room.id, this.props.user.id);
    }, 3000);
  }

  public componentWillUnmount() {
    clearInterval(RoomPageView.timer);
  }

  public async handleVote(value: ICard) {
    const currentDiscussionIndex = this.props.room.discussions.length - 1;
    const currentDiscussion = currentDiscussionIndex >= 0 ? this.props.room.discussions[currentDiscussionIndex] : null;
    if (currentDiscussion && this.props.user) {
      await this.props.setVote(currentDiscussion.id, this.props.user.id, value.id);
    }
  }

  public createStoryVoteResultInfoData(s: Array<IStoryVoteResultInfoRowProps>) {
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
  }

  public async handleEnterButtonClick() {
    const currentDiscussionIndex = this.props.room.discussions.length - 1;
    const currentDiscussion = currentDiscussionIndex >= 0 ? this.props.room.discussions[currentDiscussionIndex] : null;
    if (currentDiscussion && currentDiscussion.dateEnd === null && this.props.user) {
      await this.props.closeDiscussion(this.props.room.id, currentDiscussion.id, this.props.user.id);
    }
  }

  public async handleGoButtonClick(value: string) {
    if (this.props.user) await this.props.createDiscussion(this.props.room.id, value, this.props.user.id);
  }

  public handleCompletedStoryClick(discussionId: string) {
    this.setState({
      isModalOpen: true,
      openedDiscussionId: discussionId,
    });
  }

  public handleStoryDetailsCloseButtonClick() {
    this.setState({
      isModalOpen: false,
      openedDiscussionId: '',
    });
  }

  public async handleStoryDetailsDeleteButtonClick(discussionId: string) {
    if (this.props.user) await this.props.deleteDiscussion(this.props.room.id, discussionId, this.props.user.id);
  }

  public handleStoryDetailsDownloadButtonClick() {
    return;
  }

  public render() {
    if (this.props.room == null) {
      return null;
    }
    const currentDiscussionIndex = this.props.room && this.props.room.discussions.length - 1;
    const currentDiscussion =
      currentDiscussionIndex >= 0 && this.props.room ? this.props.room.discussions[currentDiscussionIndex] : null;

    if (this.props.user && this.props.room && currentDiscussion) {
      const { isModalOpen, openedDiscussionId } = this.state;
      const { room } = this.props;
      return (
        <>
          <main className='main_main'>
            <p className='main_block_name'>{currentDiscussion.topic}</p>
            <div className='main_block'>
              {currentDiscussion.dateEnd === null ? (
                <Board cardValues={room.deck.cards} onCardChange={this.handleVote} />
              ) : (
                <StoryVoteResult
                  playersCount={currentDiscussion.votes.length.toString()}
                  avgVote={currentDiscussion.averageResult ? currentDiscussion.averageResult.toString() : '0'}
                  storyVoteResultInfoValues={this.createStoryVoteResultInfoData([])}
                />
              )}
              <DiscussionController
                playersList={room.members}
                url={window.location.href}
                onEnterButtonClick={this.handleEnterButtonClick}
                onGoButtonClick={this.handleGoButtonClick}
                isDiscussionClosed={currentDiscussion.dateEnd != null}
                discussionName={currentDiscussion.topic}
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
              playersList={room.members}
              openedDiscussionId={openedDiscussionId}
              onStoryDetailsCloseButtonClick={this.handleStoryDetailsCloseButtonClick}
            />
          )}
        </>
      );
    } else return null;
  }
}

export default RoomPageView;
