import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { RoutePath } from '../../routes';
import Form from '../../Form/Form';
import { IRootState } from '../../../Store/types';
import { compose, Dispatch } from 'redux';
import { createUser } from '../../../Store/user/user-action-creators';
import { connect } from 'react-redux';

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
  createUser(userName: string): void;
}

interface IState {
  enteredText: string;
}

class InvitePage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      enteredText: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.history.push(`${RoutePath.MAIN}/${this.props.match.params.id}`);
    this.props.createUser(this.state.enteredText);
  };

  public handleChange = (textValue: string) => {
    this.setState({
      enteredText: textValue,
    });
  };

  render() {
    return (
      <>
        <main className='main_main'>
          <div className='main_block'>
            <Form
              title={'Join the room:'}
              values={data}
              onClick={this.handleSubmit}
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
            />
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

export default compose<React.ComponentClass>(withRouter, connect(mapStateToProps, mapDispatchToProps))(InvitePage);
