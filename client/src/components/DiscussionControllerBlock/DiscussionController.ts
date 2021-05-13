import { IRootState } from '../../store/Types';
import { connect } from 'react-redux';
import DiscussionControllerView from './DiscussionControllerView';

const mapStateToProps = (state: IRootState) => {
  return {
    room: state.room,
    user: state.user,
  };
};

export default connect(mapStateToProps)(DiscussionControllerView);
