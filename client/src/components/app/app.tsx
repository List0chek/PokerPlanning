import * as React from 'react';
import FirstPage from "../Pages/FirstPage/firstPage";
import InvitePage from "../Pages/InvitePage/invitePage";
import PlanningPage from "../Pages/PlanningPage/planningPage";
import ResultPage from "../Pages/ResultPage/resultPage";
import ResultPageEnterStory from "../Pages/ResultPage-EnterStory/resultPageEnterStory";
import Modal from "../Pages/Modal/modal";
import RoomPage from "../Pages/RoomPage/roomPage";
import "./app.css";


function App() {
  return (<RoomPage />);
}

/*const storyDetailsData = [
  {
    username: "testtesttesttesttesttest 1",
    value: "3"
  },
  {
    username: "test 2",
    value: "3"
  },
  {
    username: "test 3",
    value: "5"
  }
];

function App() {
  return (<Modal playersList={storyDetailsData}/>);
}*/

export default App;
