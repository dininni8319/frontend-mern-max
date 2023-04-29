import React, {Suspense} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
// import Users from './user/pages/Users';
// import NewPlace from './places/pages/NewPlace';
// import UserPlaces from './places/pages/UserPlaces';
// import UpdatePlace from './places/pages/UpdatePlace';
// import Auth from './auth/Auth';
import MainNavigation from './shared/components/UIElements/Navigation/MainNavigation';
import { AuthContext } from './context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import { ConfigProvider } from './context/config-context';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const Users = React.lazy(() => import("./user/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./auth/Auth"));

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
            <Suspense fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }>
              {routes}
            </Suspense>
          </main>
       </Router>
      </ConfigProvider>
    </AuthContext.Provider>
  )
};

export default App;
