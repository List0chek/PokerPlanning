import { IRootState } from '../../Store/types';
import { connect } from 'react-redux';
import MainHeaderView from './mainHeader-view';
import './mainHeader.css';

const mapStateToProps = (state: IRootState) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(MainHeaderView);
