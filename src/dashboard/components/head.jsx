import React, { Fragment } from 'react';

const Head = () => {
    return (
        <Fragment>
            <h1 style={{textAlign:"center"}}>
                Welcome
        <span className="text-secondary"> Admin</span>
            </h1>
            <h2 className="sm-heading center">
                You can controle your website from here...
       </h2>
        </Fragment>
    );
}

export default Head;