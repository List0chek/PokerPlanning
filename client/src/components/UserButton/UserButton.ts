import { connect } from 'react-redux';
import { IRootState } from '../../store/Types';
import { Dispatch } from 'redux';
import UserButtonView from './UserButtonView';
import { deleteUser } from '../../store/User/UserOperations';

const mapStateToProps = (state: IRootState) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    deleteUser: async () => {
      dispatch(await deleteUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserButtonView);
