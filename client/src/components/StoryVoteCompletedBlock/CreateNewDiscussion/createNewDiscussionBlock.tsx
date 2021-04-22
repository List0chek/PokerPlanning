import React from "react";
import "./createNewDiscussionBlock.css";


interface IProps {

  onGoButtonClick(isClicked: number, textValue: string): void;
}

class CreateNewDiscussion extends React.Component<IProps> {

  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);
    this.inputRef = React.createRef();
    this.handleGoButtonClick = this.handleGoButtonClick.bind(this);
  }

  public handleGoButtonClick = () => {
    const {current} = this.inputRef;
    let textValue = "";
    if (current != null) {
      textValue = current.value;
    }
    console.log(textValue);
    this.props.onGoButtonClick(-2, textValue);
  };

  public render() {
    return (
      <div className="story_vote_go_create_discussion_block">
        <input className="story_vote_go_textbox" type="text" placeholder="Enter something"
               required ref={this.inputRef}/>
        <button className="go_btn" type="button" onClick={this.handleGoButtonClick}>Go</button>
      </div>
    );
  }
}

export default CreateNewDiscussion;
