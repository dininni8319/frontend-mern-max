import React, { useState, useContext } from 'react';
import './PlaceItem.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const PlaceItem = props => {
  const [showMap, setShowMap ] = useState(false);
  const [ showConfirmModal, setShowConfirmModal ] = useState(false);
  const { userId, token } = useContext(AuthContext);
  
  const {
    loading,
    error,
    sendRequest,
    clearError
  } = useHttpClient();

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleleWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleleHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleleHandler = async () => {
    setShowConfirmModal(false)

    try {
      await sendRequest(
        `http://localhost:4000/api/places/${props.id}`,
        "DELETE",
        null,
        { 
          Authorization: "Bearer " + token 
        }
      );
      props.onDelete(props.id)
    } catch (error) {
      
    }

  };
  return (
    <>
     <ErrorModal error={error} onClear={clearError} />
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
            center={props.coordinates}
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
          {loading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img 
              src={`http://localhost:4000/${props.image}`}
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
          {userId === props.createdId && <Button to={`/places/${props.id}`}>EDIT</Button> }
          {userId === props.createdId && <Button danger onClick={showDeleleWarningHandler}>DELETE</Button> }
          </div>
        </Card>
      </li>
    </>
  )
};
 
export default PlaceItem;