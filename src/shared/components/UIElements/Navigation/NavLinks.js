import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';
import { AuthContext } from '../../../../context/auth-context';

const NavLinks = props => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);

  return (
    <ul className='nav-links'>
      {!isLoggedIn && ( 
        <li>
         <NavLink to='/' exact>All USERS</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
         <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
     {isLoggedIn && (  
        <li>
         <NavLink to='/places/new'>ADD PLACE</NavLink>
        </li>
      )}
      {!isLoggedIn && ( 
        <li>
         <NavLink to='/auth'>AUTHENTICATE</NavLink>
        </li>
      )}
      {
        isLoggedIn && ( 
          <li>
              <button onClick={logout}>LOGOUT</button>
          </li>
        )
      }
    </ul>
  )
}

export default NavLinks;