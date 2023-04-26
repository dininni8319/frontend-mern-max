import React from 'react';
import PlaceList from '../components/PlacesList';
import { useParams } from 'react-router-dom';

export const DUMMY_PLACES = [
  {
    id:'p1',
    title: "Empire State Building",
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?b=1&s=612x612&w=0&k=20&c=QAjKlZhDehpS0oCpLs7Rhfu2hHJf4OE0-wIk655imlE=', 
    address: "350 Fifth Avenue New York, NY 10118",
    location: {
      lat: 40.730610,
      lng: -73.935242,
    },
    creatorId: 'u1',
  },
  {
    id:'p2',
    title: "Eiffel Tower",
    description: 'The Eiffel Tower (/ˈaɪfəl/ EYE-fəl; French: tour Eiffel [tuʁ ɛfɛl] (listen)) is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.',
    imageUrl: 'https://cdn.pixabay.com/photo/2015/10/06/18/26/eiffel-tower-975004_960_720.jpg', 
    address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris, France",
    location: {
      lat: 52.9776,
      lng: 56.4504,
    },
    creatorId: 'u1',
  }
];

const UserPlaces = () => {
  const { userId } = useParams();

  const loadedPlaces = DUMMY_PLACES.filter(place => place.creatorId === userId)
  
  return <PlaceList items={loadedPlaces} />
};
 
export default UserPlaces;