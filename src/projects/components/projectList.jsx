import React from 'react';
import './projectList.css';
import ProjectItem from './projectItem';


const ProjectList = ({ data }) => {
    const list = data.map(p => <ProjectItem key={p._id} project={p}/>)
    return (
        <div className="project-list">
            {list}
        </div>

    );
}

export default ProjectList;