import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/UIElements/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './auth/Auth';
import { AuthContext } from './context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import { ConfigProvider } from './context/config-context';

const App = () => {
  const { token, login, logout, userId } = useAuth();
  let routes;

  if (token) {
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
          isLoggedIn: !!token, 
          token: token,
          userId: userId,
          // name: userData.name,
          login:login, 
          logout:logout
      }
    }>
      <ConfigProvider>
        <Router>
          <MainNavigation />
          <main>
            {routes}
          </main>
       </Router>
      </ConfigProvider>
    </AuthContext.Provider>
  )
};

export default App;
