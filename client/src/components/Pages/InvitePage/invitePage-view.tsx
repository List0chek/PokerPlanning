import React from 'react';
import { RouteComponentProps } from 'react-router';
import { RoutePath } from '../../routes';
import Form from '../../Form/Form';
import { IDiscussion, IRoom, IUser } from '../../../Store/types';

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

class InvitePageView extends React.Component<IProps> {
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

export default InvitePageView;
