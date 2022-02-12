import React, { Fragment } from 'react';

import './contact.css';
import Head from '../components/head';
import Footer from '../../shared/components/footer/footer';

const Contact = () => {
  return (
    <Fragment>
      <div id="contact">
        <Head />
        <div className="boxes">
          <div>
            <span className="text-secondary">Email: </span>{' '}
            ridhamezrigui07@gmail.com
          </div>
          <div>
            <span className="text-secondary">Phone: </span>+21695280942
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;
