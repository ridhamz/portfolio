import React from 'react';

import './video.css';


const Video = (props) => {
    return (
        <li className='project-item'>
            <div>
                <iframe
                    width="100%"
                    height="100%"
                    title="Preview"
                    allow="autoplay"
                    allowfullscreen
                    src={props.src}>
                </iframe>
            </div>
        </li>

    );
}

export default Video;
