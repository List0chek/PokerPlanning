import { connect } from 'react-redux';
import { IRootState } from '../../Store/types';
import { Dispatch } from 'redux';
import * as api from '../../api/api';
import { deleteUser } from '../../Store/user/user-action-creators';
import { deleteDiscussion } from '../../Store/discussion/discussion-action-creators';
import { deleteRoom } from '../../Store/room/room-action-creators';
import { toggleLoadingIndicator } from '../../Store/loading/loading-action-creators';
import UserButtonView from './userButton-view';
import './userButton.css';

const mapStateToProps = (state: IRootState) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    deleteUser: async () => {
      dispatch(toggleLoadingIndicator(true));
      try {
        await api.deleteUserRequest();
        dispatch(deleteUser());
        dispatch(deleteDiscussion());
        dispatch(deleteRoom());
      } finally {
        dispatch(toggleLoadingIndicator(false));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserButtonView);
