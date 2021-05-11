import { IRootState } from '../../Store/types';
import { connect } from 'react-redux';
import DiscussionControllerView from './discussionController-view';
import './discussionController.css';

const mapStateToProps = (state: IRootState) => {
  return {
    room: state.room,
    user: state.user,
    discussion: state.discussion,
  };
};

export default connect(mapStateToProps)(DiscussionControllerView);
