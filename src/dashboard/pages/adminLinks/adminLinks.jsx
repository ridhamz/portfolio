import React from 'react';
import { NavLink } from 'react-router-dom';
import './adminLinks.css';

const AdminLinks = () => {
    return ( 
        <div className='center'>
            
                <NavLink className="adminLinks" to='/addprojects' exact>Projects</NavLink>
            
                <NavLink className="adminLinks" to='/admin/skills' exact>Skills</NavLink>
           
                <NavLink className="adminLinks" to='/admin/awards' exact>Awards</NavLink>
            
            </div>
     );
}
 
export default AdminLinks;