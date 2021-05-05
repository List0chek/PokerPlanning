import React from 'react';
import './input.css';

export interface IInputProps {
  className: string;
  labelName: string;
  placeholderText?: string;
  inputName?: string;
  onChange(textValue: string): void;
}

class Input extends React.Component<IInputProps> {
  private inputRef: React.RefObject<HTMLInputElement>;
  constructor(props: IInputProps) {
    super(props);
    this.inputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  public handleChange() {
    const { current } = this.inputRef;
    let textValue = '';
    if (current != null) {
      textValue = current.value;
    }
    console.log(textValue);
    this.props.onChange(textValue);
  }

  render() {
    const { className, labelName, placeholderText, inputName } = this.props;
    return (
      <div className={className}>
        <label className='login_form_label' htmlFor={labelName}>
          {labelName}
        </label>
        <input
          className='textarea_name'
          id={labelName}
          type='text'
          name={inputName}
          placeholder={placeholderText}
          required
          ref={this.inputRef}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Input;
