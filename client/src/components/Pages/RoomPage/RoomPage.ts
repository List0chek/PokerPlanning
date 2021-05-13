import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { IRootState } from '../../../store/Types';
import RoomPageView from './RoomPageView';
import {
  addMemberToRoom,
  closeDiscussion,
  createDiscussion,
  deleteDiscussion,
  getRoomInfo,
  setVote,
} from '../../../store/Room/RoomOperations';
import { getUser } from '../../../store/User/UserOperations';

const mapStateToProps = (state: IRootState) => {
  return {
    room: state.room,
    user: state.user,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setVote: async (discussionId: string, userId: string, cardId: string) => {
      return dispatch(await setVote(discussionId, userId, cardId));
    },
    /*getUser: async () => {
      return dispatch(await getUser());
    },*/
    getUser: async (roomId: string) => {
      return dispatch(await getUser(roomId));
    },
    getRoomInfo: async (roomId: string, userId: string) => {
      return dispatch(await getRoomInfo(roomId, userId));
    },
    closeDiscussion: async (roomId: string, discussionId: string, userId: string) => {
      return dispatch(await closeDiscussion(roomId, discussionId, userId));
    },
    createDiscussion: async (roomId: string, topicName: string, userId: string) => {
      return dispatch(await createDiscussion(roomId, topicName, userId));
    },
    deleteDiscussion: async (roomId: string, discussionId: string, userId: string) => {
      return dispatch(await deleteDiscussion(roomId, discussionId, userId));
    },
    addMemberToRoom: async (roomId: string, userId: string) => {
      return dispatch(await addMemberToRoom(roomId, userId));
    },
  };
};

export default compose<React.ComponentClass>(withRouter, connect(mapStateToProps, mapDispatchToProps))(RoomPageView);
