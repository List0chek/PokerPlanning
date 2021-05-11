import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RoutePath } from '../routes';
import FirstPage from '../Pages/CreateRoomPage/createRoomPage';
import InvitePage from '../Pages/InvitePage/invitePage';
import RoomPage from '../Pages/RoomPage/roomPage';
import ErrorPage from '../Pages/ErrorPage/errorPage';
import BasePage from '../Pages/basepage';
import { connect } from 'react-redux';
import { IRootState } from '../../Store/types';
import './app.css';
import Spinner from '../Spinner/spinner';

interface IProps {
  loadingIndicator: boolean;
}

const App: React.FunctionComponent<IProps> = ({ loadingIndicator }) => {
  return (
    <BasePage>
      <Spinner show={loadingIndicator} />
      <Switch>
        <Route path={RoutePath.INDEX} exact={true} component={FirstPage} />
        <Route path={`${RoutePath.MAIN}/:id`} exact={true} component={RoomPage} />
        <Route path={`${RoutePath.INVITE}/:id`} exact={true} component={InvitePage} />
        <Route component={ErrorPage} />
      </Switch>
    </BasePage>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    loadingIndicator: state.loadingIndicator,
  };
};

export default connect(mapStateToProps)(App);
