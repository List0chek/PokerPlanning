import React from 'react';
import { withRouter } from 'react-router-dom';
import { RoutePath } from '../../routes';
import { RouteComponentProps } from 'react-router';
import Form from '../../Form/Form';
import { IRoom, IRootState, IUser } from '../../../Store/types';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { updateUser } from '../../../Store/user/user-action-creators';
import * as api from '../../../api/api';
import authService from '../../../services/auth-service';
import { updateRoom } from '../../../Store/room/room-action-creators';

const data = [
  {
    className: 'input_username',
    labelName: 'Username',
    placeholderText: 'Enter your name',
    inputName: 'username',
  },
  {
    className: 'input_roomname',
    labelName: 'Room name',
    placeholderText: 'Enter room name',
    inputName: 'roomname',
  },
];

interface IProps extends RouteComponentProps<any> {
  createUser(userName: string): Promise<{ user: IUser; token: string }>;
  createRoom(roomName: string, userId: string): Promise<IRoom>;
  room: IRoom;
  user: IUser;
}

class CreateRoomPage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public async handleSubmit(inputUsernameValue: string, inputRoomnameValue: string) {
    //this.props.createUser(inputUsernameValue).then(() => this.props.createRoom(inputRoomnameValue, this.props.user.id));
    await this.props.createUser(inputUsernameValue);
    await this.props.createRoom(inputRoomnameValue, this.props.user.id);
    this.props.history.push(`${RoutePath.MAIN}/${this.props.room.id}`);
  }

  render() {
    return (
      <>
        <main className='main_main'>
          <div className='main_block'>
            <Form title={'Create the room:'} values={data} onSubmit={this.handleSubmit} />
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
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    createUser: async (userName: string) => {
      const response = await api.createUserRequest(userName);
      authService.set(response.token);
      dispatch(updateUser(response.user));
      return response.user;
    },
    createRoom: async (roomName: string, userId: string) => {
      const response = await api.createRoomRequest(roomName, userId);
      dispatch(updateRoom(response));
      return response;
    },
  };
};

export default compose<React.ComponentClass>(withRouter, connect(mapStateToProps, mapDispatchToProps))(CreateRoomPage);
