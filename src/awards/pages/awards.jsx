import React, { Fragment } from 'react';
import Head from '../components/head';
import './awards.css';
import AwardsList from '../components/awardsList';

const Awards = () => {
    return ( 
        <Fragment>
        <Head />
        <AwardsList/>
        </Fragment>
     );
}
 
export default Awards;