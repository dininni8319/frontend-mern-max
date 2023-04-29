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
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const NewPlace = () => {
  const { userId, token } = useContext(AuthContext);
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
    },
    image: {
      value: null,
      isValid: false
    }

  },false);
  

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("creator", userId);

      await sendRequest(
        "http://localhost:4000/api/places",
        "POST",
        formData,
        { Authorization: "Bearer " + token }
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
          <ImageUpload 
            id="image" 
            onInput={inputHandler}
            errorText="Please provide a valid image" 
          />
          <Button type="submit" disabled={!formState.isValid}>
            Add a Place
          </Button>
      </form>
    </>
  );
}
 
export default NewPlace;