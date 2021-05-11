import React from 'react';
import { withRouter } from 'react-router-dom';
import { IRootState } from '../../../Store/types';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { updateUser } from '../../../Store/user/user-action-creators';
import * as api from '../../../api/api';
import authService from '../../../services/auth-service';
import { updateRoom } from '../../../Store/room/room-action-creators';
import { updateDiscussion } from '../../../Store/discussion/discussion-action-creators';
import { toggleLoadingIndicator } from '../../../Store/loading/loading-action-creators';
import CreateRoomPageView from './createRoomPage-view';

const mapStateToProps = (state: IRootState) => {
  return {
    room: state.room,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    createUser: async (userName: string) => {
      dispatch(toggleLoadingIndicator(true));
      try {
        const response = await api.createUserRequest(userName);
        authService.set(response.token);
        dispatch(updateUser(response.user));
        return response.user;
      } finally {
        dispatch(toggleLoadingIndicator(false));
      }
    },
    createRoom: async (roomName: string, userId: string) => {
      dispatch(toggleLoadingIndicator(true));
      try {
        const response = await api.createRoomRequest(roomName, userId);
        dispatch(updateRoom(response));
        return response;
      } finally {
        dispatch(toggleLoadingIndicator(false));
      }
    },
    createDiscussion: async (roomId: string, topicName: string, userId: string) => {
      dispatch(toggleLoadingIndicator(true));
      try {
        const response = await api.createDiscussionRequest(roomId, topicName, userId);
        dispatch(updateDiscussion(response));
        return response;
      } finally {
        dispatch(toggleLoadingIndicator(false));
      }
    },
  };
};

export default compose<React.ComponentClass>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CreateRoomPageView);
