import React from 'react';
import { withRouter } from 'react-router-dom';
import { RoutePath } from '../../routes';
import { RouteComponentProps } from 'react-router';
import Form from '../../Form/Form';
import { IRootState } from '../../../Store/types';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createUser } from '../../../Store/user/user-action-creators';

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
  createUser(userName: string): void;
}

class CreateRoomPage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleSubmit = (inputUsernameValue: string) => {
    const roomId = Math.round(Math.random() * (100 - 1) + 1);
    this.props.history.push(`${RoutePath.MAIN}/${roomId}`);
    this.props.createUser(inputUsernameValue);
  };

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
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    createUser: (userName: string) => dispatch(createUser(userName)),
  };
};

export default compose<React.ComponentClass>(withRouter, connect(mapStateToProps, mapDispatchToProps))(CreateRoomPage);
