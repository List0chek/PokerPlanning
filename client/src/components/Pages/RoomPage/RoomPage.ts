import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { IRootState } from '../../../store/Types';
import RoomPageView from './RoomPageView';
import {
  addAndSaveMemberToRoom,
  closeAndSaveDiscussion,
  createAndSaveDiscussion,
  deleteAndSaveDiscussion,
  loadAndSaveRoomInfo,
  setAndSaveVote,
} from '../../../store/Room/RoomOperations';
import { loadAndSaveUser } from '../../../store/User/UserOperations';

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
      return dispatch(await setAndSaveVote(discussionId, userId, cardId));
    },
    loadUser: async () => {
      return dispatch(await loadAndSaveUser());
    },
    loadRoomInfo: async (roomId: string, userId: string) => {
      return dispatch(await loadAndSaveRoomInfo(roomId, userId));
    },
    closeDiscussion: async (roomId: string, discussionId: string, userId: string) => {
      return dispatch(await closeAndSaveDiscussion(roomId, discussionId, userId));
    },
    createDiscussion: async (roomId: string, topicName: string, userId: string) => {
      return dispatch(await createAndSaveDiscussion(roomId, topicName, userId));
    },
    deleteDiscussion: async (roomId: string, discussionId: string, userId: string) => {
      return dispatch(await deleteAndSaveDiscussion(roomId, discussionId, userId));
    },
    addMemberToRoom: async (roomId: string, userId: string) => {
      return dispatch(await addAndSaveMemberToRoom(roomId, userId));
    },
  };
};

export default compose<React.ComponentClass>(withRouter, connect(mapStateToProps, mapDispatchToProps))(RoomPageView);
