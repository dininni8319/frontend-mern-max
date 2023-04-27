import React, { useState, useEffect } from 'react';
import UserList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
  const [ users, setUsers ] = useState([]);
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(false);
// console.log(users, 'testing the users');
  useEffect(() => {

    const sendRequest = async () => {
      setLoading(true);
      try {
        
        const response = await fetch('http://localhost:4000/api/user/');
        
        const responseData = await response.json();
        
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setUsers([...responseData]);
      } catch (err) {
        setLoading(false)
        setError(err.message);
      }
    
      setLoading(false)  
    }
    sendRequest();


    // second option 
    // setLoading(true);
    
    // fetch('http://localhost:4000/api/user/')
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(response.message)
    //     }

    //     return response.json();
    //   })
    //   .then(data => {
    //     setLoading(false);
    //     console.log(data, 'DATA RESPONSE');
    //     // setUsers(data)
    //   })
    //   .catch((err) => {
    //     setLoading(false)
    //     setError(err.message);
    //   }); 
  }, [])
  
  const errorHandler = () => {
    setError(null);
  }
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
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