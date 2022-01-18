import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/uiElements/avatar';
import Card from '../../shared/components/uiElements/card';

import './userItem.css';

const UserItem = ({ user }) => {
    return (
        <li className="user-item">
            <Card className="user-item__content">
                <Link to={`/${user.id}/places`}>
                    <div className="user-item__image">
                        <Avatar
                            image={`${process.env.REACT_APP_IMG_URL}/${user.image}`}
                            alt={''}
                        />
                    </div>
                    <div className="user-item__info">
                        <h2>{user.name}</h2>
                        <h3>
                            {user.places.length} {user.placeCount === 1 ? 'Place' : 'Places'}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
}

export default UserItem;