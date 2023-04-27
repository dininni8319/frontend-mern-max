import React from 'react';
import './UsersList.css';
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';

const UsersList = (props) => {

  if (props.items.length === 0) {
    return (
    <div className='center'>
      <Card>
        <h2>No users found.</h2>
      </Card>
    </div>
    )
  }

  console.log(props.items, 'testing the items');
  return <ul>
    {props.items.map(user => 
      (<UserItem 
          key={user.id} 
          id={user.id} 
          name={user.name}
          image={user.image}
          placeCount={user.places.length}
       />
      )
    )
    }
  </ul>
}

 
export default UsersList;