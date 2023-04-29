import React, { useEffect, useState, useContext } from 'react';
import PlaceList from '../components/PlacesList';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { ConfigContext } from "../../context/config-context";

const UserPlaces = () => {
  const [ loadedPlaces, setLoadedPlaces ] = useState([]);
  const {
    loading,
    error,
    sendRequest,
    clearError
  } = useHttpClient();

  const { api_url } = useContext(ConfigContext);
  const { userId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`${api_url.backend}/places/user/${userId}`);
        setLoadedPlaces(responseData.places)
        
      } catch (error) { 
      }
    }
    
    fetchPlaces()
  }, [sendRequest, userId])
  
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