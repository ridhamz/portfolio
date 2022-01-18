import React from 'react';
import './userList.css';
import UserItem from './userItem';
import Card from '../../shared/components/uiElements/card';


const UserList = ({ items }) => {
    if (items.length === 0) {
        return <div className="center">
            <Card>
                <h2>No users found.</h2>
            </Card>
        </div>
    }
    return (
        <ul className="users-list">
            {items.map(user => {
                return <UserItem key={user.id} user={user} />
            })}
        </ul>
    );
}

export default UserList;