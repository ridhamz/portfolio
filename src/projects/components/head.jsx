import React, { Fragment } from 'react';

const Head = (props) => {
    return (
         <Fragment>
         <div>
            <h1 style={{textAlign:"center"}}>
                My
        <span className="text-secondary"> Works</span>
            </h1>
            <h2 className="sm-heading center">
               Some of my Works...
       </h2>
       </div>
        </Fragment>
    );
}

export default Head;