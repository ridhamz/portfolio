import React from 'react';
import './home.css';
import devicon from '../icons/dev.png'
import linkedn from '../icons/linkedIn.png'
import github from '../icons/github.svg'
import meduim from '../icons/meduim.png'

const Home = () => {
    return ( 
        <div className="homeClass" id="#bg-img">
            <h1 className="lg-heading">
               Ridha
      <span className="text-secondary"> Mezrigui</span>
            </h1>
            <h2 className="sm-heading">
                Full Stack Developer, JavaScript Enthusiast  & Blogger
            </h2>
            <div className="icons">
                <a href="https://www.linkedin.com/in/ridha-mezrigui-205010177/">
                <img src={linkedn} width='35' />
                </a>
                <a href="https://github.com/ridhamz">
                <img src={github} width='35' /> 
                </a>

                <a href="https://medium.com/@ridhamezrigui07">
                <img src={meduim} width='35' />
                </a>
                <a href="https://dev.to/ridhamz">
               <img src={devicon} width='37' />  
                </a>
            </div>
        </div>

     );
}
 
export default Home;