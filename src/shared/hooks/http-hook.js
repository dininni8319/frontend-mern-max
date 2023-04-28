import { useState, useEffect, useCallback, useRef } from 'react';

export const useHttpClient = () => {
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const activeHttpRequests = useRef([]); 

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      // we can use the abort controller to abort the request in case the user change the page
      const httpAbortCtrl = new AbortController(); // api supported in modern browser
      activeHttpRequests.current.push(httpAbortCtrl); //pushing in to the useRef

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal //links the abort controller to cancel the request
        });
        
        const responseData = await response.json();
        
        // we wanna clear the controller for the request just been completed;
        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );
            
        if (!response.ok) {
          throw new Error(responseData.message);
        };
        
        setLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setLoading(false);
        
        throw err;
      }
  },[]);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => { //clean up function
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    }
  },[])

  return { 
    loading,
    error, 
    sendRequest,
    clearError
  };
};