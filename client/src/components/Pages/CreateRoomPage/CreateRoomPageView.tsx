import React from 'react';
import { RoutePath } from '../../Routes';
import { RouteComponentProps } from 'react-router';
import Form from '../../Form/Form';
import { IDiscussion, IRoom, IUser } from '../../../store/Types';

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
  {
    className: 'input_discussionName',
    labelName: 'Discussion name',
    placeholderText: 'Enter discussion name',
    inputName: 'discussionName',
  },
];

interface IProps extends RouteComponentProps<any> {
  createUser(userName: string): Promise<{ user: IUser; token: string }>;
  createRoom(roomName: string, userId: string): Promise<IRoom>;
  createDiscussion(roomId: string, topicName: string, userId: string): Promise<IDiscussion>;
  room: IRoom;
  user: IUser;
}

class CreateRoomPageView extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public async handleSubmit(inputUsernameValue: string, inputRoomnameValue: string, inputDiscussionName: string) {
    try {
      await this.props.createUser(inputUsernameValue);
      await this.props.createRoom(inputRoomnameValue, this.props.user.id);
      await this.props.createDiscussion(this.props.room.id, inputDiscussionName, this.props.user.id);
      this.props.history.push(`${RoutePath.MAIN}/${this.props.room.id}`);
    } catch (error) {
      alert(error);
    }
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

export default CreateRoomPageView;
