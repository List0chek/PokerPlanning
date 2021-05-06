import React from 'react';
import Card from '../Card/card';
import { ICard } from '../../Store/types';
import './board.css';

interface IProps {
  cardValues: Array<ICard>;
  onCardChange(value: ICard): void;
}

class Board extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleCardChange = this.handleCardChange.bind(this);
  }

  public handleCardChange(value: ICard) {
    console.log(value);
    this.props.onCardChange(value);
  }

  public render() {
    const { cardValues } = this.props;
    return (
      <div className='board'>
        {cardValues.map((item) => {
          return <Card key={item.id} card={item} onChange={this.handleCardChange} />;
        })}
      </div>
    );
  }
}

export default Board;
