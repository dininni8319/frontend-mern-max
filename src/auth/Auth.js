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
import LoadingSinner from '../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
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
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const loginSubmitHandler = async event => {
    event.preventDefault();
    
    if (isLoginMode) {
      setIsLoading(true);
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:4000/api/user/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        })
        
        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(responseData.message)         
        }
        setIsLoading(false);
        login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.")
      }
    } else {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:4000/api/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        })
        
        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(responseData.message)         
        }
        setIsLoading(false);
        login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.")
      }
    }
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

  const errorHandler = () => {
    setError(null);
  }
  return ( 
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        <form onSubmit={loginSubmitHandler}>
          {isLoading && <LoadingSinner asOverlay />}
          <h2>Login Required</h2>
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
    </>
   );
};
 
export default Auth;