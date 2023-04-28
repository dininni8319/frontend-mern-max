import React, { useState, useEffect } from 'react';
import UserList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const [ users, setUsers ] = useState([]);
  
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
          'http://localhost:4000/api/user/'
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