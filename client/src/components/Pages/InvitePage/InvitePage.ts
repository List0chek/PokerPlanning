import React from 'react';
import { withRouter } from 'react-router-dom';
import { IRootState } from '../../../store/Types';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import InvitePageView from './InvitePageView';
import { createUser } from '../../../store/User/UserOperations';
import { addMemberToRoom } from '../../../store/Room/RoomOperations';

const mapStateToProps = (state: IRootState) => {
  return {
    room: state.room,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    createUser: async (userName: string) => {
      return dispatch(await createUser(userName));
    },
    addMemberToRoom: async (roomId: string, userId: string) => {
      return dispatch(await addMemberToRoom(roomId, userId));
    },
  };
};

export default compose<React.ComponentClass>(withRouter, connect(mapStateToProps, mapDispatchToProps))(InvitePageView);
