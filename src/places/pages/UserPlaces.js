import React, { useEffect, useState } from 'react';
import PlaceList from '../components/PlacesList';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const UserPlaces = () => {
  const [ loadedPlaces, setLoadedPlaces ] = useState([]);
  const {
    loading,
    error,
    sendRequest,
    clearError
  } = useHttpClient();

  const { userId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:4000/api/places/user/${userId}`);
        setLoadedPlaces(responseData.places)
        
      } catch (error) { 
      }
    }
    
    fetchPlaces()
  }, [sendRequest])
  
  const placeDeletedHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId))
  };

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
      {!loading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />}
    </>

  )
};
 
export default UserPlaces;