import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useHistory } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../context/auth-context';

import './PlaceForm.css';

const UpdatePlace = () => {
  const { placeId } = useParams();
  const history = useHistory();
  const [ loadedPlace, setLoadedPlace ] = useState(null);
  const { userId, token } = useContext(AuthContext);

  const {
    loading,
    error,
    sendRequest,
    clearError
  } = useHttpClient();

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

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/places/${placeId}`
        );
            setLoadedPlace(responseData.place);
            setFormData({
              title: {
                value: responseData.place.title,
                isValid: true
              },
              description: {
                value: responseData.place.description,
                isValid: true
              }
            }, true);
      } catch (error) {
      }
    }
    fetchPlace();
  },[sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:4000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          "Content-Type": "application/json",
           Authorization: "Bearer " + token 
        }
      );
      history.push(`/${userId}/places`)
    } catch (error) {
      
    }
  };
  
  if (loading) {
    return <LoadingSpinner />
  }; 

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card> 
      </div>
    )
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!loading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input 
            id="title"
            element='input'
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            error="Please provide valid title."
            onInput={inputHandler}
            initialValue={loadedPlace?.title}
            initialValid={true}
          />

          <Input 
            id="description"
            element='textarea'
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            error="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          
          <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
      )}
    </>
  ); 
};
 
export default UpdatePlace;