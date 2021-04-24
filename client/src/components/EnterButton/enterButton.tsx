import React from "react";
import "./enterButton.css";

interface IProps {
  className: string;
}

const EnterButton: React.FunctionComponent<IProps> = (props) => {
  return (
      <div className="input_enter_btn">
        <button className={`enter_btn + ${props.className}`} type="submit">Enter</button>
      </div>
  );
};

export default EnterButton;
