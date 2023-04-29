import React, { useState, useEffect, useContext } from 'react';
import UserList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { ConfigContext } from "../../context/config-context";

const Users = () => {
  const [ users, setUsers ] = useState([]);
  const { api_url } = useContext(ConfigContext);
  const {
    loading,
    error,
    sendRequest,
    clearError
  } = useHttpClient();

  useEffect(() => {
    const fetchUsersList = async () => {
      try {
        const response = await sendRequest(
          `${api_url.backend}/user/`
        );

        setUsers([...response]);
      } catch (err) {
      }
    }
    fetchUsersList();
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
      { !loading && users && <UserList items={users} />}
    </>
   );
}
 
export default Users;