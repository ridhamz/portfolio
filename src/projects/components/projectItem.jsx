import React, { useState, Fragment } from 'react';
import Card from '../../shared/components/uiElements/card';
import Button from '../../shared/components/formElements/button';
import './projectItem.css';
import Modal from '../../shared/components/modal/modal';
import Video from '../../shared/components/video/video';
import LoadingSpinner from '../../shared/components/uiElements/LoadingSpinner';

const ProjectItem = ({ project }) => {
  const [details, setDetails] = useState(false);
  const [video, setVideo] = useState(false);

  const detailsHandler = () => {
    setDetails(true);
  };

  const videoHandler = () => {
    setVideo(true);
  };

  const detailsCancelHandler = () => {
    setDetails(false);
  };

  const videoCancelHandler = () => {
    setVideo(false);
  };

  const technologiesUsed = project.technologies.split(',');
  const videoSrc = video ? project.video : null;
  const linkExist = project.link;
  return (
    <Fragment>
      {/*________________________DETAILS___________________________________________________________ */}
      <Modal show={details} modalClosed={detailsCancelHandler}>
        <div className="text-secondary" style={{ padding: '4px' }}>
          Description :
        </div>
        {project.description}
        <br />
        <div className="text-secondary" style={{ padding: '4px' }}>
          Technologies used :
        </div>
        {technologiesUsed.map((tech) => (
          <div key={tech}>- {tech}</div>
        ))}

        <div
          style={{
            borderTop: '1px solid #eece1a',
            padding: '10px',
            marginTop: '8px',
          }}
        >
          <Button onClick={detailsCancelHandler}>CLOSE</Button>
        </div>
      </Modal>

      {/*________________________VIDEO___________________________________________________________ */}
      <Modal show={video} modalClosed={videoCancelHandler}>
        <p>Preview :</p>
        {videoSrc ? (
          <Video src={videoSrc} />
        ) : (
          <center>
            <LoadingSpinner />
          </center>
        )}
        <div style={{ borderTop: '1px solid #eece1a', padding: '8px' }}>
          <Button onClick={videoCancelHandler}>CLOSE</Button>
        </div>
      </Modal>

      <li className="project-item">
        <Card>
          <div>
            <img
              src={'https://mezriguiridha.herokuapp.com' + '/' + project.image}
              alt="error"
            />
          </div>
          <div className="project-item__info">
            <p className="text-secondary">{project.title}</p>
          </div>
          <div className="project-item__actions">
            <Button onClick={detailsHandler}>Details</Button>
            <Button onClick={videoHandler}>Video</Button>
            <a className="button" href={project.githubLink}>
              Code
            </a>
            {linkExist && (
              <a className="button" href={project.link}>
                Link
              </a>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default ProjectItem;
