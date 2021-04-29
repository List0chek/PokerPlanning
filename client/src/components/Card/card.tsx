import React from 'react';
import './card.css';

interface IProps {
  value: string;

  onChange(value: string): void;
}

const coffeeIcon = (
  <svg className='card_text' width='38' height='34' viewBox='0 0 38 34' xmlns='http://www.w3.org/2000/svg'>
    <path d='M33.6667 0.5H4.33333V18.8333C4.33333 22.885 7.615 26.1667 11.6667 26.1667H22.6667C26.7183 26.1667 30 22.885 30 18.8333V13.3333H33.6667C35.7017 13.3333 37.3333 11.7017 37.3333 9.66667V4.16667C37.3333 2.13167 35.7017 0.5 33.6667 0.5ZM33.6667 9.66667H30V4.16667H33.6667V9.66667ZM33.6667 33.5H0.666668V29.8333H33.6667V33.5Z' />
  </svg>
);

const Card: React.FunctionComponent<IProps> = (props) => {
  const handleChange = () => {
    props.onChange(props.value);
  };

  return (
    <>
      <input id={props.value} className='radio' type='radio' name='radio' value={props.value} onChange={handleChange} />
      <label className='card' htmlFor={props.value}>
        <span className='card_text'>{props.value === '☕' ? coffeeIcon : props.value}</span>
      </label>
    </>
  );
};

export default Card;
