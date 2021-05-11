import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { RoutePath } from '../../routes';
import Form from '../../Form/Form';
import { IDiscussion, IRoom, IRootState, IUser } from '../../../Store/types';
import { compose, Dispatch } from 'redux';
import { updateUser } from '../../../Store/user/user-action-creators';
import * as api from '../../../api/api';
import { connect } from 'react-redux';
import authService from '../../../services/auth-service';
import { updateRoom } from '../../../Store/room/room-action-creators';
import { updateDiscussion } from '../../../Store/discussion/discussion-action-creators';
import { toggleLoadingIndicator } from '../../../Store/loading/loading-action-creators';

const data = [
  {
    className: 'input_username',
    labelName: 'Username',
    placeholderText: 'Enter your name',
    inputName: 'username',
  },
];

interface IMatchParams {
  id: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {
  createUser(userName: string): Promise<{ user: IUser; token: string }>;
  getRoomInfo(roomId: string, userId: string): Promise<IRoom>;
  getDiscussionInfo(discussionId: string, userId: string): Promise<IDiscussion>;
  addMemberToRoom(roomId: string, userId: string): Promise<IRoom>;
  user: IUser;
  room: IRoom;
  discussion: IDiscussion;
}

class InvitePage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public async handleSubmit(inputUsernameValue: string) {
    await this.props.createUser(inputUsernameValue);
    await this.props.addMemberToRoom(this.props.match.params.id, this.props.user.id);
    await this.props.getRoomInfo(this.props.match.params.id, this.props.user.id);
    const currentDiscussion = this.props.room.discussions.find((item) => item.dateEnd === null);
    let currentDiscussionId;
    if (currentDiscussion) {
      currentDiscussionId = currentDiscussion.id;
    } else {
      currentDiscussionId = '';
    }
    await this.props.getDiscussionInfo(currentDiscussionId, this.props.user.id);
    this.props.history.push(`${RoutePath.MAIN}/${this.props.match.params.id}`);
  }

  render() {
    return (
      <>
        <main className='main_main'>
          <div className='main_block'>
            <Form title={'Join the room:'} values={data} onSubmit={this.handleSubmit} />
          </div>
        </main>
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
    createUser: async (userName: string) => {
      dispatch(toggleLoadingIndicator(true));
      try {
        const response = await api.createUserRequest(userName);
        authService.set(response.token);
        dispatch(updateUser(response.user));
        return response.user;
      } finally {
        dispatch(toggleLoadingIndicator(false));
      }
    },
    getRoomInfo: async (roomId: string, userId: string) => {
      const response = await api.getRoomInfoRequest(roomId, userId);
      dispatch(updateRoom(response));
      return response;
    },
    getDiscussionInfo: async (discussionId: string, userId: string) => {
      const response = await api.getDiscussionInfoRequest(discussionId, userId);
      dispatch(updateDiscussion(response));
      return response;
    },
    addMemberToRoom: async (roomId: string, userId: string) => {
      const response = await api.addMemberToRoomRequest(roomId, userId);
      dispatch(updateRoom(response));
      return response;
    },
  };
};

export default compose<React.ComponentClass>(withRouter, connect(mapStateToProps, mapDispatchToProps))(InvitePage);
