import React, { Fragment } from 'react';
import img from '../../assets/images/about.webp';
import Card from '../../shared/components/uiElements/card';
import bio from '../../icons/bio.png';
const Bio = () => {
  return (
    <Fragment>
      <Card>
        <img src={img} alt="ridha" className="bio-image" />
      </Card>

      <div className="bio" style={{ padding: 7 }}>
        <Card>
          <h3 className="text-secondary">
            <img src={bio} width="25" /> BIO
          </h3>
          <p>
            I am Ridha Mezrigui an innovative tech mind who believes in self
            education.
            <br />
            Since very young age I have been passionate about computers and
            programming. <br />
            I wanted to know how do things work in the background, how all those
            programs are made. <br />I really enjoy working with JavaScript
            technologies such as React💙 and Nodejs💚.
          </p>
        </Card>
      </div>
    </Fragment>
  );
};

export default Bio;
