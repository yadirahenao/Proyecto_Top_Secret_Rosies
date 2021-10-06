import React from 'react';
import { Link } from 'react-router-dom';
import Footer from 'components/Footer';

function Configuration() {
  return (
    <div>
     <div className='users'>
       <h1 className="t_modulo">Gestión de usuarios</h1>  
     </div>
        
      <div className="mainContainer">  
      <div className="busqueda">      
        <select className="Opc_filtro">
          <option value="1">(Filtrar por)</option> 
            <option value="2">Id usuario</option> 
            <option value="3">Nombre</option> 
            <option value="4">Apellido</option>
            <option value="5">Rol</option>
            <option value="6">Estado</option>
        </select>

        <input className="id_user" type="text" name="user"></input>
        <button className="boton_buscar">Buscar</button>
        <Link to='/NewUser'>
          <p className='L_Nuevo'>Nuevo usuario</p>
        </Link> 
        </div>

      <div className="table_users">
      <table>
            <thead>
                <th>Código usuario</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <td></td>
            </thead>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <Link to='/NewUser'>
          <p className='L_Editar'>Editar</p>
        </Link>
            
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <Link to='/NewUser'>
          <p className='L_Editar'>Editar</p>
        </Link>
 
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <Link to='/NewUser'>
          <p className='L_Editar'>Editar</p>
        </Link>
 
        </tr>
        </table>
        <Link to='/Configuration'>
          <p className='L_Actualizar'>Actualizar</p>
        </Link>
        

      </div>
      <Footer/>
      </div>
   </div>
  );
}

export default Configuration;