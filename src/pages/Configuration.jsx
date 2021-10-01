import React from 'react';
import { Link } from 'react-router-dom';

function Configuration() {
  return (
    <div className='users'>
      <h1 className="t_consultar">Consultar usuario</h1>
      <div className="busuqeda">
        <span className="id_user_label">Código usuario</span>
        <input className="ide_user" type="text" name="user"></input>
        <button className="boton_buscar">Buscar</button>
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
            </thead>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        </table>
        <Link to='/NewProducts'>
          <p>Agregar usuario</p>
        </Link>
        
       

      </div>

    </div>
  );
}

export default Configuration;