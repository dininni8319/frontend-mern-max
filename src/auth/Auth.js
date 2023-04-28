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
import { useHttpClient } from '../shared/hooks/http-hook';
import ImageUpload from '../shared/components/FormElements/ImageUpload';

const Auth = () => {
  const [ isLoginMode, setIsLoginMode ] = useState(true);
  const { login } = useContext(AuthContext);

  const {
    loading,
    error, 
    sendRequest,
    clearError
  } = useHttpClient();

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

  const loginSubmitHandler = async event => {
    event.preventDefault();
    
    console.log(formState.inputs, 'test');
    if (isLoginMode) {
      try {
        const response = await sendRequest("http://localhost:4000/api/user/signin", "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            "Content-Type": "application/json"
          }
        );
        
        login(response?.user.id);
      } catch (err) {
      }
    } else {
      try {
        // here we are formatting the data like multipart/form-data
        // because the image is in binary format, json will not work
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest("http://localhost:4000/api/user/signup", 
          "POST",
          formData,
        )
        login(responseData.user.id);
      } catch (err) {
      }
    }
  };
  
  const switchToSignUp = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined,
        image: undefined,
      }, formState.inputs.email.isValid && formState.inputs.password.value)
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        }, 
        image: {
          value: {
            value: null,
            isValid: false
          }
        }
      }, false)
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  return ( 
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        <form onSubmit={loginSubmitHandler}>
          {loading && <LoadingSinner asOverlay />}
          <h2>Login Required</h2>
          <hr />
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
          {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler} />}
          
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
              validators={[VALIDATOR_MINLENGTH(8)]}
              onInput={inputHandler}
              errorText= "Please enter a valid password (at least 8 characters!)"
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