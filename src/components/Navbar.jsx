import React, { useState } from 'react';
import * as FcIcons from 'react-icons/fc'
import { Link } from 'react-router-dom';
import {SidebarData} from 'components/SideMenuData'
import Logo from 'media/logo-b.png';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);  
    const showSidebar = () => setSidebar(!sidebar);
  
    return (
      <>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FcIcons.FcMenu onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <FcIcons.FcMenu/>
                </Link>
              </li>
              <img className = 'logo-b' src={Logo}></img>
              <br></br>
              {SidebarData.map((item, index) => {  //Used the map function to create sidebar elements using the data in SideMenuData.js
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>

                );
              })}
            </ul>
          </nav>
      </>
    );
  }
  
  export default Navbar;