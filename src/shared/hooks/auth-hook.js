import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [ tokenExpirationDate, setTokenExpirationDate ] = useState();
  const [ userData, setUserData ] = useState({
    token: "",
    name: "",
    email:"",
    uid: ""
  });
   
  const login = useCallback((
    uid,
    token,
    email,
    name,
    expirationDate
    ) => {
      setUserData(prevState => (
        {...prevState, 
          token: token,
          email: email,
          name: name,
          uid:uid
        }
      ));
      // exsisting experation date or it creates a new one 
      const tokenExpirationDate = expirationDate 
        || new Date(new Date().getTime() + 1000 * 60 * 60);  // add one hour to the current date
      
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem("user", JSON.stringify({
        token: token,
        email: email,
        name: name,
        uid:uid,
        expiration: tokenExpirationDate.toISOString() //to ensure that no data is lost when we call the method JSON.stringify()
      }));

  },[]);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setTokenExpirationDate(null);
    setUserData({
      token: "",
      email: "",
      name: "",
      uid: ""
    });
  }, []);

  useEffect(() => {
    if (userData.token && tokenExpirationDate) {
      // tokenExpirationDate.getTime() time in millisecond sinze 1970
      const remainingTime = tokenExpirationDate.getTime() - new Date(); // current date
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer);
    }
  },[userData.token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user")) // the parse method converts the json object/text back into JS
    if ( 
        storedData && 
        storedData.token && 
        new Date(storedData.expiration > new Date())
    ) {
      login(
        storedData.uid, 
        storedData.token,
        storedData.email,
        storedData.name,
        new Date(storedData.expiration)
      )
    }
  },[login]); //this function will run one, after the render cicle

  return { 
    token: userData.token,
    login, 
    logout,
    userId: userData.uid
  }
}