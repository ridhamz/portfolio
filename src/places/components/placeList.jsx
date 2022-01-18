import React from 'react';
import PlaceItem from './placeItem';

import Card from '../../shared/components/uiElements/card';
import Button from '../../shared/components/formElements/button';
import './placeList.css';

const PlaceList = ({ items, onDeletePlace }) => {
    if (items.length === 0)
        return (
            <div className='place-list center'>
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <Button to='/places/new'>Share Place</Button>
                </Card>
            </div>)
    return (
        <ul className='place-list'>
            {
                items.map(place => <PlaceItem key={place.id} place={place} onDelete={onDeletePlace} />)
            }
        </ul>
    );
}

export default PlaceList;