import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from "react-icons/gi";

export const SidebarData = [
  {
    title: 'Inicio',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },

  {
    title: 'Ventas',
    path: '/ventas',
    icon: <IoIcons.IoIosCart />,
    cName: 'nav-text'
  },

  {
    title: 'Productos',
    path: '/productos',
    icon: <GiIcons.GiSoap/>,
    cName: 'nav-text'
  },

  {
    title: 'Configuración',
    path: '/configuracion',
    icon: <FaIcons.FaCogs />,
    cName: 'nav-text'
  },
  
];

