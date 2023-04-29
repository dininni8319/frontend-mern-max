import React, { useContext } from 'react';
import './UserItem.css';
import Avatar from '../../shared/components/UIElements/Avatar';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import { ConfigContext } from "../../context/config-context";

const UserItem = (props) => {

  const { api_url } = useContext(ConfigContext);
  
  return (
    <li className='user-item'>
      <div className='user-item__content'>
        <Card>
          <Link to={`/${props.id}/places`}>
            <div className="user-item__image">
              <Avatar
                image={`http://localhost:4000/${props.image}`}
                alt={props.name}
              />
            </div>
            <div className="user-item__info">
              <h2>{props.name}</h2>
              <h3>
                {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
              </h3>
            </div>
          </Link>
        </Card>
      </div>
    </li>
  )
}
 
export default UserItem;