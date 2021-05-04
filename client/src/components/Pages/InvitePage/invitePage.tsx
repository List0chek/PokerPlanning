import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { RoutePath } from '../../routes';
import MainHeader from '../../MainHeader/mainHeader';
import Footer from '../../Footer/footer';
import Form from '../../Form/Form';

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

const InvitePage: React.FC<RouteComponentProps<IMatchParams>> = (props) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.history.push(`${RoutePath.MAIN}/${props.match.params.id}`);
  };

  return (
    <>
      <main className='main_main'>
        <div className='main_block'>
          <Form title={'Join the room:'} values={data} onClick={handleSubmit} onSubmit={handleSubmit} />
        </div>
      </main>
    </>
  );
};

export default withRouter(InvitePage);
