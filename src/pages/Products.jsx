import React from 'react';
import { Link } from 'react-router-dom';

function Products() {
  return (
    <div className='ventas'>
      <h2 className="t_consultar">PRODUCTOS</h2>
      <div className="busuqeda">
        <span className="id_user_label">ID producto</span>
        <input className="ide_user" type="text" name="user"></input>
        <button className="boton_buscar">Buscar</button>
      </div>

      <div className="table_users">
      <table>
            <thead>
                <th>ID producto</th>
                <th>Descripción</th>
                <th>Valor unitario</th>
                <th>Estado</th>

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
        <Link to='/NewProducts'>
          <p>Agregar Nuevo producto</p>
        </Link>
       

      </div>
    </div>
  );
}

export default Products;