import React, { useState, useContext } from 'react';
import './PlaceItem.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../context/auth-context';

const PlaceItem = props => {
  const [showMap, setShowMap ] = useState(false);
  const [ showConfirmModal, setShowConfirmModal ] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleleWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleleHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleleHandler = () => {
    setShowConfirmModal(false)
    console.log("DELETING...");
  };
  return <>
    <Modal  
      show={showMap}
      onCancel={closeMapHandler}
      header={props.address}
      contentClass="place-item__modal-content"
      footerClass="place-item__modal-actions"
      footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
    >
      {/* {props.children} */}
      <div className="map-container">
        <Map 
          center={props.coordinate}
          zoom={8}
        /> 
      </div>
    </Modal>
    <Modal  
      show={showConfirmModal}
      onCancel={cancelDeleleHandler}
      header="Are you sure?"
      footerClass="place-item__modal-actions"
      footer={
        <>
          <Button inverse onClick={cancelDeleleHandler}>CANCEL</Button>
          <Button dangere onClick={confirmDeleleHandler}>DELETE</Button>
        </>
      }
    >
      
    </Modal>
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img 
            src={props.image}
            alt={props.title} 
          />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
          <Button 
            inverse 
            onClick={openMapHandler}
          >VIEW ON THE MAP</Button>
        { isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button> }
        { isLoggedIn && <Button danger onClick={showDeleleWarningHandler}>DELETE</Button> }
        </div>
      </Card>
    </li>
  </>
};
 
export default PlaceItem;