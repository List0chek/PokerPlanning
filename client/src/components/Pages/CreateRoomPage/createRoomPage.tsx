import React from 'react';
import { withRouter } from 'react-router-dom';
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
  {
    className: 'input_roomname',
    labelName: 'Room name',
    placeholderText: 'Enter room name',
    inputName: 'roomname',
  },
];

const CreateRoomPage: React.FC<any> = (props) => {
  const handleClick = () => {
    const roomId = Math.round(Math.random() * (100 - 1) + 1);
    window.console.log(roomId);
    props.history.push(`${RoutePath.MAIN}/${roomId}`);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <MainHeader isAuth={false} />
      <main className='main_main'>
        <div className='main_block'>
          <Form title={'Create the room:'} values={data} onClick={handleClick} onSubmit={handleSubmit} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default withRouter(CreateRoomPage);
