import React from 'react';
import './button.css';

interface IProps {
  className: string;
  onClick(event: React.FormEvent): void;
}

const Button: React.FunctionComponent<IProps> = (props) => {
  const handleClick = (event: React.FormEvent) => {
    props.onClick(event);
  };

  return (
    <div className='input_enter_btn'>
      <button className={`enter_btn + ${props.className}`} type='submit' onClick={handleClick}>
        Enter
      </button>
    </div>
  );
};

export default Button;
