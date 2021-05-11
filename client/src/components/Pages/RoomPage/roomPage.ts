import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { IRootState } from '../../../Store/types';
import * as api from '../../../api/api';
import { updateRoom } from '../../../Store/room/room-action-creators';
import { updateDiscussion } from '../../../Store/discussion/discussion-action-creators';
import { toggleLoadingIndicator } from '../../../Store/loading/loading-action-creators';
import { updateUser } from '../../../Store/user/user-action-creators';
import RoomPageView from './roomPage-view';

const mapStateToProps = (state: IRootState) => {
  return {
    room: state.room,
    user: state.user,
    discussion: state.discussion,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setVote: async (discussionId: string, userId: string, cardId: string) => {
      dispatch(toggleLoadingIndicator(true));
      try {
        await api.setVoteRequest(discussionId, userId, cardId);
      } finally {
        dispatch(toggleLoadingIndicator(false));
      }
    },
    getUser: async () => {
      const response = await api.getUserRequest();
      if (response) dispatch(updateUser(response));
      return response;
    },
    getRoomInfo: async (roomId: string, userId: string) => {
      const response = await api.getRoomInfoRequest(roomId, userId);
      if (response) dispatch(updateRoom(response));
      return response;
    },
    getDiscussionInfo: async (discussionId: string, userId: string) => {
      const response = await api.getDiscussionInfoRequest(discussionId, userId);
      if (response) dispatch(updateDiscussion(response));
      return response;
    },
    closeDiscussion: async (roomId: string, discussionId: string, userId: string) => {
      dispatch(toggleLoadingIndicator(true));
      try {
        const response = await api.closeDiscussionRequest(roomId, discussionId, userId);
        dispatch(updateDiscussion(response));
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
    deleteDiscussion: async (roomId: string, discussionId: string, userId: string) => {
      dispatch(toggleLoadingIndicator(true));
      try {
        await api.deleteDiscussionRequest(roomId, discussionId, userId);
      } finally {
        dispatch(toggleLoadingIndicator(false));
      }
    },
  };
};

export default compose<React.ComponentClass>(withRouter, connect(mapStateToProps, mapDispatchToProps))(RoomPageView);
