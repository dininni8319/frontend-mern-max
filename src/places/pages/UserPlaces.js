import React, { useEffect, useState } from 'react';
import PlaceList from '../components/PlacesList';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

export const DUMMY_PLACES = [];

const UserPlaces = () => {
  const [ loadedPlaces, setLoadedPlaces ] = useState();
  const {
    loading,
    error,
    sendRequest,
    clearError
  } = useHttpClient();

  const { userId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      const responseData = await sendRequest(`http://localhost:4000/api/places/user/${userId}`);
      setLoadedPlaces(responseData.places)
    }
    fetchPlaces()
  }, [sendRequest])
  
  return (
    <>
       <ErrorModal error={error} onClear={clearError} />
       {
         loading && (
           <div className="center">
             <LoadingSpinner />
           </div>
         )
       }
      {!loading && loadedPlaces && <PlaceList items={loadedPlaces} />}
    </>

  )
};
 
export default UserPlaces;