
import { getDefaultNormalizer } from '@testing-library/dom'
import './navbar.css'
import React, { useState} from "react";
import Data from './Data';


function Navbar() {
  
    return (
        <nav className="main-nav">
            <div className="logo1">
                <h2>Course Finder</h2>
            </div>
            <div className="logo2">
                <h4>Courses Found:</h4>   
            </div>
        </nav>

        
       
       
       
    )
    
}

export default Navbar