import React, { Fragment } from 'react';

const Head = () => {
    return (
        <Fragment>
            <h1 style={{textAlign:"center"}}>
                About
        <span className="text-secondary"> Me</span>
            </h1>
            <h2 className="sm-heading center">
                Let me tell you a few things...
       </h2>
        </Fragment>
    );
}

export default Head;