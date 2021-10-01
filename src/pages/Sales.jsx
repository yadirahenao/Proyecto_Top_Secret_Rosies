import React from 'react';
import { Link } from 'react-router-dom';

function Sales() {
  return (
    <div className='ventas'>
      <h2 className="t_consultar">VENTAS</h2>
      <div className="busuqeda">
        <span className="id_user_label">ID venta</span>
        <input className="ide_user" type="text" name="user"></input>
        <button className="boton_buscar">Buscar</button>
      </div>

      <div className="table_users">
      <table>
            <thead>
                <th>ID venta</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Documento de identidad</th>

            </thead>
        <tr>
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
        </tr>

        <tr>
        </tr>
        </table>

        <Link to='/NewSales'>
          <p>Nueva venta</p>
        </Link>    

      </div>
    </div>
  );
}

export default Sales;


