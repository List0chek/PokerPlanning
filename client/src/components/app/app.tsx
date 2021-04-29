import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RoutePath } from '../routes';
import FirstPage from '../Pages/CreateRoomPage/createRoomPage';
import InvitePage from '../Pages/InvitePage/invitePage';
import RoomPage from '../Pages/RoomPage/roomPage';
import ErrorPage from '../Pages/ErrorPage/errorPage';
import './app.css';

const App: React.FunctionComponent<any> = () => {
  return (
    <Switch>
      <Route path={RoutePath.INDEX} exact={true} component={FirstPage} />
      <Route path={`${RoutePath.MAIN}/:id`} exact={true} component={RoomPage} />
      <Route path={`${RoutePath.INVITE}/:id`} exact={true} component={InvitePage} />
      <Route component={ErrorPage} />
    </Switch>
  );
};

export default App;
