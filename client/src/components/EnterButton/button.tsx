import React from 'react';
import './button.css';

interface IProps {
  className: string;
  onSubmit(event: React.FormEvent): void;
}

const Button: React.FunctionComponent<IProps> = (props) => {
  const handleSubmit = (event: React.FormEvent) => {
    props.onSubmit(event);
  };

  return (
    <div className='input_enter_btn'>
      <button className={`enter_btn + ${props.className}`} type='submit' onSubmit={handleSubmit}>
        Enter
      </button>
    </div>
  );
};

export default Button;
