import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from "react-icons/gi";

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
  
];

