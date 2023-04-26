import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DUMMY_PLACES } from './UserPlaces';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';

import './PlaceForm.css';

const UpdatePlace = () => {
  const { placeId } = useParams();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ formState, inputHandler, setFormData ] = useForm({
    title: {
      value: "",
      isValid: false
    },
    description: {
      value: "",
      isValid: false
    }
  }, false);
  
  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState);
  };

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);
  
  useEffect(() => {
    if (identifiedPlace) {
      setFormData({
        title: {
          value: identifiedPlace.title,
          isValid: true
        },
        description: {
          value: identifiedPlace.description,
          isValid: true
        }
      }, true)
    }
    setIsLoading(false); 
  },[setFormData, identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card> 
      </div>
    )
  };
  
  if (isLoading) {
    return  <h2 className='center'>Loading....</h2>
  }; 

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input 
        id="title"
        element='input'
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        error="Please provide valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />

      <Input 
        id="description"
        element='textarea'
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        error="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      
      <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
    </form>
  ); 
};
 
export default UpdatePlace;