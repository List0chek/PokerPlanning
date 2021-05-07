import React from 'react';
import Button from '../EnterButton/button';
import ActionName from '../ActionName/actionName';
import Input from '../InputAnyName/input';
import './Form.css';

interface IProps {
  title: string;
  values: Array<any>;
  onSubmit(inputUsernameValue: string, inputRoomnameValue?: string): void;
}

const Form: React.FunctionComponent<IProps> = (props) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    const inputUsername = form.elements[props.values[0].inputName] as HTMLInputElement;
    const isInputRoomnameExist = props.values[1];

    if (isInputRoomnameExist) {
      const inputRoomname = form.elements[props.values[1].inputName] as HTMLInputElement;
      props.onSubmit(inputUsername.value, inputRoomname.value);
    } else {
      props.onSubmit(inputUsername.value);
    }
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
      <Button className={'login_form_button'} />
    </form>
  );
};

export default Form;
