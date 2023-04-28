import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './NewPlace.css';
import { AuthContext } from '../../context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const NewPlace = () => {
  const { userId } = useContext(AuthContext);
  const history = useHistory();
  const {
    loading,
    error,
    sendRequest,
    clearError
  } = useHttpClient();

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
  
  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:4000/api/places",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: userId
        }),
        {"Content-Type": "application/json"}
      )
        history.push("/")
      //Redirect the user to a different page
    } catch (err) {
      
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
          {loading && <LoadingSpinner asOverlay />}
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
    </>
  );
}
 
export default NewPlace;