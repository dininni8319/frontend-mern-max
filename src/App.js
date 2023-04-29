import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/UIElements/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './auth/Auth';
import { AuthContext } from './context/auth-context';

const App = () => {
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
    name
    ) => {

      setUserData(prevState => (
      {...prevState, 
        token: token,
        email: email,
        name: name,
        uid:uid
      }
    ));

  },[]);

  const logout = useCallback(() => {
    setUserData({
      token: "",
      email: "",
      name: "",
      uid: ""
    });
  }, []);

  let routes;

  if (userData.token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/places/new' exact>
          <NewPlace />
        </Route>
        <Route path='/places/:placeId' exact>
            <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    )
  }
  return (
    <AuthContext.Provider 
      value={{
          isLoggedIn: !!userData.token, 
          token: userData.token,
          userId: userData.uid,
          name: userData.name,
          login:login, 
          logout:logout
      }
    }>
        <Router>
          <MainNavigation />
          <main>
            {routes}
          </main>
       </Router>
    </AuthContext.Provider>
  )
};

export default App;
