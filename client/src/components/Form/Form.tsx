import React from 'react';
import Button from '../EnterButton/button';
import ActionName from '../ActionName/actionName';
import Input from '../InputAnyName/input';
import './Form.css';

interface IProps {
  title: string;
  values: Array<any>;
  onClick(event: React.FormEvent): void;
  onSubmit(event: React.FormEvent): void;
  onChange(textValue: string): void;
}

class Form extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  public handleChange = (textValue: string) => {
    this.props.onChange(textValue);
  };

  public handleSubmit = (event: React.FormEvent) => {
    this.props.onSubmit(event);
  };

  public handleClick = (event: React.FormEvent) => {
    this.props.onClick(event);
  };

  render() {
    const { title, values } = this.props;
    return (
      <form className='login_form' onSubmit={this.handleSubmit}>
        <h2 className='login_form_h2'>{"Let's start!"}</h2>
        <ActionName actionName={title} />
        {values.map((item) => {
          return (
            <Input
              key={item.inputName}
              className={item.className}
              labelName={item.labelName}
              placeholderText={item.placeholderText}
              inputName={item.inputName}
              onChange={this.handleChange}
            />
          );
        })}
        <Button className={'login_form_button'} onClick={this.handleClick} />
      </form>
    );
  }
}

export default Form;
