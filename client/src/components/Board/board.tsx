import React from 'react';
import Card from '../Card/card';
import './board.css';

interface IProps {
  cardValues: Array<string>;
  onCardChange(value: string | null): void;
}

class Board extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleCardChange = this.handleCardChange.bind(this);
  }

  public handleCardChange(value: string) {
    this.props.onCardChange(value);
  }

  public render() {
    const { cardValues } = this.props;
    return (
      <div className='board'>
        {cardValues.map((item) => {
          return <Card key={item} value={item} onChange={this.handleCardChange} />;
        })}
      </div>
    );
  }
}

export default Board;
