import { IRootState } from '../../store/Types';
import { connect } from 'react-redux';
import CompletedStoriesView from './CompletedStoriesView';

const mapStateToProps = (state: IRootState) => {
  return {
    user: state.user,
    room: state.room,
  };
};

export default connect(mapStateToProps)(CompletedStoriesView);
