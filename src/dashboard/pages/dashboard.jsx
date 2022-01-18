import React, { Fragment } from 'react';
import AdminLinks from './adminLinks/adminLinks';
import Head from '../components/head';


const Dashboard = () => {
    return ( 
        <Fragment>
        <Head/>
        <AdminLinks />
        </Fragment>
     );
}
 
export default Dashboard;