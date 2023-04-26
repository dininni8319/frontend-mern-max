import React, { useState, useContext } from 'react';
import {
  VALIDATOR_REQUIRE, 
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../shared/util/validators';
import './Auth.css';
import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';
import { useForm } from '../shared/hooks/form-hook';
import Card from '../shared/components/UIElements/Card';
import { AuthContext } from '../context/auth-context';

const Auth = () => {
  const [ formState, inputHandler, setFormData ] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
  },false);
  
  const [ isLoginMode, setIsLoginMode ] = useState(true);
  const { login } = useContext(AuthContext)
  const loginSubmitHandler = event => {
    event.preventDefault();
    console.log('LOGIN', formState.inputs);
    login()
  };
  
  const switchToSignUp = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined
      }, formState.inputs.email.isValid && formState.inputs.password.value)
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        }
      }, false)
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  return ( 
    <Card className="authentication">
    <form onSubmit={loginSubmitHandler} >
       {!isLoginMode && (
           <Input 
            id="name"
            element="input" 
            type="text" 
            label="Your Name" 
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText= "Please enter a name."
         />
       )} 
        <Input 
          id="email"
          element="input" 
          type="email" 
          label="E-mail" 
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
          errorText= "Please enter a valid email!"
        />
        <Input 
          id="password"
          type="password"
          element="input"  
          label="Password" 
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          errorText= "Please enter a valid password (at least eight characters!)"
        />
        
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
    </form>

    <Button inverse onClick={switchToSignUp}>SWITCH TO SIGNUP</Button>
    </Card>
   );
};
 
export default Auth;