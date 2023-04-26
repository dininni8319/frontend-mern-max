import React, { useEffect, useReducer } from 'react';
import './Input.css';

import { inputReducer } from '../../../reducers/inputReducer';

const Input = props => {

  const initialState = {
    value: props.initialValue || "",
    isTouched: false, 
    isValid: props.initialValid || false 
  };

  const [ inputState, dispatch ] = useReducer(inputReducer, initialState);

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    props.onInput(props.id, inputState.value, inputState.isValid)
  }, [id, value, onInput, isValid]);

  const changeHandler = event => {
    dispatch(
      { 
        type: "CHANGE", 
        val: event.target.value,
        validators: props.validators
      });
  };
  
  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    })
  };

  const element = props.element === 'input' ? (
    <input 
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputState.value}
    />
  ) : (
    <textarea
     id={props.id} 
     row={props.rows || 3}
     onChange={changeHandler}
     value={inputState.value}
     onBlur={touchHandler}
    />
  );

  return (
    <div className={`form-control
    ${!inputState.value && 
      inputState.isTouched &&
      "form-control--invalid"}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && <p>{props.errorText}</p>}
   </div>
  )
};

export default Input