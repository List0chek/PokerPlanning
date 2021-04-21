import React from "react";
import "./playerRow.css";
import cellUserIcon from "../../../images/User Icon.svg";
import checkCircle from "../../../images/check_circle_24px.png";

interface IProps {
  username?: string;
  value?: string;
  isChecked?: boolean;
}

const PlayerRow: React.FunctionComponent<IProps> = (props) => {
  return (
    <tr className="row">
      <td className="cell_user_icon"><img src={cellUserIcon} alt="userIcon" width="42" height="42"/></td>
      <td className="cell_username">{props.username}</td>
      <td className="cell_voted_icon">{props.isChecked == true && props.isChecked != null ? <img src={checkCircle} alt="check_circle_icon" width="24" height="24"/> : props.value}</td>
    </tr>
  );
};

export default PlayerRow;


