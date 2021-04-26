import React from "react";
import "./inviteFriend.css";

interface IProps {
  url: string;
}

const InviteFriend: React.FunctionComponent<IProps> = (props) => {

  const handleFocus = (event: any) => event.target.select();

  return (
    <div className="story_vote_invite_friend">
      <label>
        Invite friend
        <input className="story_vote_invite_friend_url" type="url" name="url"
               value={props.url} onClick={handleFocus} readOnly/>
      </label>
    </div>
  );
};

export default InviteFriend;


