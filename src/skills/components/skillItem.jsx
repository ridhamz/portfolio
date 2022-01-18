import React from 'react';
import './skill.css';
import Card from '../../shared/components/uiElements/card';

const SkillItem = (props) => {
    return (
        <li className='skill-item'>
            <Card>
                <div className='skill-item__info'>
                    <p style={{ color: "#eece1a", fontSize: '20px' }}>
                        {props.title}
                    </p>
                </div>
                <div className='skill-item__actions'>
                    {props.info.map(el => <p key={el}>{el}</p>)}
                </div>
            </Card>
        </li>
    );
}

export default SkillItem;