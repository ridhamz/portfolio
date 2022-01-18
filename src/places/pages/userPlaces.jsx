import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/placeList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/uiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/uiElements/LoadingSpinner';

const UserPlaces = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const userId = useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_API_URL+`/places/user/${userId}`
                );
                setLoadedPlaces(responseData.places);
            } catch (err) { }
        }
        fetchPlaces();
    }, [sendRequest, userId])

    const placeDeleteHandler = placeId => {
        setLoadedPlaces(prevPlaces =>
            prevPlaces.filter(place => place.id !== placeId));
    }

    return (
        <Fragment>
            {error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
        </Fragment>
    );
}

export default UserPlaces;