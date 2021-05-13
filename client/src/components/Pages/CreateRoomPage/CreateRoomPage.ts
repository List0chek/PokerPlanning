import React from 'react';
import { withRouter } from 'react-router-dom';
import { IRootState } from '../../../store/Types';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import CreateRoomPageView from './CreateRoomPageView';
import { createAndSaveDiscussion, createAndSaveRoom } from '../../../store/Room/RoomOperations';
import { createAndSaveUser } from '../../../store/User/UserOperations';

const mapStateToProps = (state: IRootState) => {
  return {
    room: state.room,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    createUser: async (userName: string) => {
      return dispatch(await createAndSaveUser(userName));
    },
    createRoom: async (roomName: string, userId: string) => {
      return dispatch(await createAndSaveRoom(roomName, userId));
    },
    createDiscussion: async (roomId: string, topicName: string, userId: string) => {
      return dispatch(await createAndSaveDiscussion(roomId, topicName, userId));
    },
  };
};

export default compose<React.ComponentClass>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CreateRoomPageView);
