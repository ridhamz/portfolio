import React, { Fragment } from 'react';
import Head from '../components/head';
import './skills.css'
import SkillItem from '../components/skillItem';
const Skills = () => {
    const languages = [
        'JavaScript',
        'TypeScript',
        'Java',
    ];

    const frameworks = [
        'Nodejs/Express',
        'React/redux',
        'koa.js',
        'Next.js'
    ];

    const paradigms = [
        'FUNCTIONAL PROGRAMMING',
        'OBJECT-ORIENTED PROGRAMMING',
        'ASYNCHRONOUS PROGRAMMING',
        'MICROSERVICES ARCHITECTURE',
        'REST & graphQL APIS',
    ];

    const dataStorage = [
        'mysql',
        'mongoDB'
    ];
    return (
        <Fragment>
            <Head />
            <div className="skills-list">
                <SkillItem title="Paradigms" info={paradigms} />
                <SkillItem title="Programming Languages" info={languages} />
                <SkillItem title="Frameworks" info={frameworks} />
                <SkillItem title="Data Storage" info={dataStorage} />
            </div>
        </Fragment>
    );
}

export default Skills;

