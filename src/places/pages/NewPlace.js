import React, { useCallback, useReducer } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from '../../shared/hooks/form-hook';
import './NewPlace.css';

const NewPlace = () => {
  const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    }
  },false);
  
  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState, 'FORM DATA');
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input 
          id="title"
          element="input" 
          type="text" 
          label="Title" 
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText= "Please enter a valid title!"
        />
        <Input 
          id="description"
          element="textarea"  
          label="Description" 
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          errorText= "Please enter a valid description (at least five characters!"
        />
         <Input 
          id="address"
          element="input" 
          type="text" 
          label="Address" 
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText= "Please enter a valid address!"
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add a Place
        </Button>
    </form>
  );
}
 
export default NewPlace;