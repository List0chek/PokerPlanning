import React from 'react';
import { withRouter } from 'react-router-dom';
import { IRootState } from '../../../Store/types';
import { compose, Dispatch } from 'redux';
import { updateUser } from '../../../Store/user/user-action-creators';
import * as api from '../../../api/api';
import { connect } from 'react-redux';
import authService from '../../../services/auth-service';
import { updateRoom } from '../../../Store/room/room-action-creators';
import { updateDiscussion } from '../../../Store/discussion/discussion-action-creators';
import { toggleLoadingIndicator } from '../../../Store/loading/loading-action-creators';
import InvitePageView from './invitePage-view';

const mapStateToProps = (state: IRootState) => {
  return {
    room: state.room,
    user: state.user,
    discussion: state.discussion,
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
    getRoomInfo: async (roomId: string, userId: string) => {
      const response = await api.getRoomInfoRequest(roomId, userId);
      dispatch(updateRoom(response));
      return response;
    },
    getDiscussionInfo: async (discussionId: string, userId: string) => {
      const response = await api.getDiscussionInfoRequest(discussionId, userId);
      dispatch(updateDiscussion(response));
      return response;
    },
    addMemberToRoom: async (roomId: string, userId: string) => {
      const response = await api.addMemberToRoomRequest(roomId, userId);
      dispatch(updateRoom(response));
      return response;
    },
  };
};

export default compose<React.ComponentClass>(withRouter, connect(mapStateToProps, mapDispatchToProps))(InvitePageView);
