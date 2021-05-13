import '../../DiscussionControllerBlock/DiscussionController.css';
import { IRootState } from '../../../store/Types';
import { connect } from 'react-redux';
import ModalView from './ModalView';

const mapStateToProps = (state: IRootState) => {
  return {
    room: state.room,
  };
};

export default connect(mapStateToProps)(ModalView);
