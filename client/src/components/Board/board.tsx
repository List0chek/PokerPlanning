import React from "react";
import "./board.css";
import Card from "../Card/card";

interface IProps {
  cardValues: Array<string>;
}

interface IState {
  selectedCard: string | null;
}

class Board extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedCard: null
    };
    this.handleCardChange = this.handleCardChange.bind(this);
  }

  public handleCardChange(value: string) {
    this.setState({
      selectedCard: value
    })
  }

  public render() {
    const {cardValues} = this.props;
    const {selectedCard} = this.state;
    return (
      <div className="board">
        {this.props.cardValues.map((item) => {
          return <Card key={item}
                       value={item}
                       onChange={this.handleCardChange}
                       isChecked={item === selectedCard}/>;
        })}
      </div>
    );
  }
}


export default Board;
