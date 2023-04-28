import React from 'react';
import './PlaceList.css';
import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlacesItem';
import Button from '../../shared/components/FormElements/Button';

const PlaceList = props => {
  if(props.items.lenth === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to='/places/new'>Share Place</Button>
        </Card>
      </div>
    );
  }

  return <ul className="place-list"> 
    {props.items.map(place =>
      (<PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          place={place} 
          description={place.description}
          address={place.address}
          createdId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      )
    )}
  </ul>
}
 
export default PlaceList;