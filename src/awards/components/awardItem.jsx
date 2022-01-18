import React from 'react';


import './awardItem.css';
import Card from '../../shared/components/uiElements/card';

const AwardItem = (props) => {
    return (
        <li className='award-item'>
            <Card>
                <div className='award-item__image'>
                    <img src={props.img} alt="error" />
                </div>
                <div className='award-item__info'>
                    <p>
                        {props.description}
                  </p>
                </div>
                <div className='award-item__actions7'>
                </div>
            </Card>
        </li>
    );
}

export default AwardItem;