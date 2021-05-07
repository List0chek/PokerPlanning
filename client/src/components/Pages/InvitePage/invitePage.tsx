import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { RoutePath } from '../../routes';
import Form from '../../Form/Form';
import { IRootState, IUser } from '../../../Store/types';
import { compose, Dispatch } from 'redux';
import { updateUser } from '../../../Store/user/user-action-creators';
import * as api from '../../../api/api';
import { connect } from 'react-redux';
import authService from '../../../services/auth-service';

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
  user: IUser;
}

class InvitePage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (inputUsernameValue: string) => {
    this.props.history.push(`${RoutePath.MAIN}/${this.props.match.params.id}`);
    this.props.createUser(inputUsernameValue);
  };

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
  };
};

export default compose<React.ComponentClass>(withRouter, connect(mapStateToProps, mapDispatchToProps))(InvitePage);
