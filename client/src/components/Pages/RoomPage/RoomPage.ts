import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { IRootState } from '../../../store/Types';
import RoomPageView from './RoomPageView';
import {
  addMemberToRoomAndStoreOperation,
  closeDiscussionAndStoreOperation,
  createDiscussionAndStoreOperation,
  deleteDiscussionAndStoreOperation,
  loadRoomAndStoreOperation,
  setVoteAndStoreOperation,
} from '../../../store/Room/RoomOperations';
import { loadUserAndStoreOperation } from '../../../store/User/UserOperations';

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
      return dispatch(await setVoteAndStoreOperation(discussionId, userId, cardId));
    },
    loadUser: async () => {
      return dispatch(await loadUserAndStoreOperation());
    },
    loadRoomInfo: async (roomId: string, userId: string) => {
      return dispatch(await loadRoomAndStoreOperation(roomId, userId));
    },
    closeDiscussion: async (roomId: string, discussionId: string, userId: string) => {
      return dispatch(await closeDiscussionAndStoreOperation(roomId, discussionId, userId));
    },
    createDiscussion: async (roomId: string, topicName: string, userId: string) => {
      return dispatch(await createDiscussionAndStoreOperation(roomId, topicName, userId));
    },
    deleteDiscussion: async (roomId: string, discussionId: string, userId: string) => {
      return dispatch(await deleteDiscussionAndStoreOperation(roomId, discussionId, userId));
    },
    addMemberToRoom: async (roomId: string, userId: string) => {
      return dispatch(await addMemberToRoomAndStoreOperation(roomId, userId));
    },
  };
};

export default compose<React.ComponentClass>(withRouter, connect(mapStateToProps, mapDispatchToProps))(RoomPageView);
