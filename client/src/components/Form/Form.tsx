import React from 'react';
import EnterButton from '../EnterButton/enterButton';
import ActionName from '../ActionName/actionName';
import Input, { IInputProps } from '../InputAnyName/input';
import './Form.css';

interface IProps {
  title: string;
  values: Array<IInputProps>;
  onClick(event: React.FormEvent): void;
  onSubmit(event: React.FormEvent): void;
}

const Form: React.FunctionComponent<IProps> = (props) => {
  const handleClick = (event: React.FormEvent) => {
    props.onClick(event);
  };

  const handleSubmit = (event: React.FormEvent) => {
    props.onSubmit(event);
  };

  return (
    <form className='login_form' onSubmit={handleSubmit}>
      <h2 className='login_form_h2'>{"Let's start!"}</h2>
      <ActionName actionName={props.title} />
      {props.values.map((item) => {
        return (
          <Input
            key={item.inputName}
            className={item.className}
            labelName={item.labelName}
            placeholderText={item.placeholderText}
            inputName={item.inputName}
          />
        );
      })}
      <EnterButton className={'login_form_button'} onClick={handleClick} />
    </form>
  );
};

export default Form;
