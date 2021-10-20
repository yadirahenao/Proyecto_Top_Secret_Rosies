import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from "react-icons/gi";
import * as CgIcons from "react-icons/cg";
import { useAuth0 } from "@auth0/auth0-react";



export const SidebarData = [
  {
    title: 'Inicio',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },

  {
    title: 'Ventas',
    path: '/sales',
    icon: <IoIcons.IoIosCart />,
    cName: 'nav-text'
  },

  {
    title: 'Productos',
    path: '/products',
    icon: <GiIcons.GiSoap/>,
    cName: 'nav-text'
  },

  {
    title: 'Configuración',
    path: '/configuration',
    icon: <FaIcons.FaCogs />,
    cName: 'nav-text'
  },
  
  {
    title: 'Cerrar sesión',
    path: '/',
    icon: <CgIcons.CgLogOff />,
    cName: 'nav-text'

  },

  
];
    
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

export default LogoutButton;
            
     
