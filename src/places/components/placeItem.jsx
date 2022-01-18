import React, { useState, Fragment, useContext } from 'react';
import Button from '../../shared/components/formElements/button';
import Card from '../../shared/components/uiElements/card';
import Modal from '../../shared/components/uiElements/modal';
import MapBox from '../../shared/components/uiElements/map';
import ErrorModal from '../../shared/components/uiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/uiElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';


import './placeItem.css';

const PlaceItem = ({ place, onDelete }) => {
    const auth = useContext(AuthContext);
    const {
        id,
        title,
        adresse,
        description,
        image,
        creator
    } = place;

    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();


    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);
    const shoDeleteWarningHandler = () => setShowConfirmModal(true);
    const cancelDeleteHandler = () => setShowConfirmModal(false);

    const confirmDeleteHandler = async e => {
        e.preventDefault();
        setShowConfirmModal(false);
        try {
            
            await sendRequest(
                `${process.env.REACT_APP_API_URL}/places/${id}`,
                'DELETE',
                null,
                { Authorization: 'Bearer ' + auth.token }
            )
            onDelete(id);
        } catch (error) {
         console.log(error)
        }
    }
    return (
        <Fragment>
            {error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && <LoadingSpinner asOverlay />}
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={adresse}
                contentclass='place-item__modal-content'
                footerClass='place-item__modal-actions'
                footer={<Button  onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className='map-container'>
                    <MapBox />
                </div>
                <small style={{color:'red'}}>Sorry for this error. i must have a credit card to display google maps in this box.</small>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header='Are you sure?'
                footerClass='place-item__modalactions'
                footer={
                    <Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </Fragment>
                }
            >
                <p>
                    Do you want to proceed and delete this place?
                    Please nore that it can't be undone thereafetr
                </p>
            </Modal>
            <li className='place-item'>
                <Card>
                    <div className='place-item__image'>
                        <img src={`${process.env.REACT_APP_IMG_URL}/${image}`} alt={title} />
                    </div>
                    <div className='place-item__info'>
                        <h2>{title}</h2>
                        <h3>{adresse}</h3>
                        <p>{description}</p>
                    </div>
                    <div className='place-item__actions'>
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        {auth.userId === creator && <Button to={`/places/${id}`}>EDIT</Button>}
                        {auth.userId === creator && <Button danger onClick={shoDeleteWarningHandler}>DELETE</Button>}
                    </div>
                </Card>
            </li>
        </Fragment>
    );
}

export default PlaceItem;