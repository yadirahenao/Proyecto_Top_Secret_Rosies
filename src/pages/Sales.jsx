import React from 'react';
import { Link } from 'react-router-dom';
import Footer from 'components/Footer';

function Sales() {
  return (
      <div>
      <h2 className="t_modulo">Gestión de ventas</h2>
         
      <div className="busqueda">       
        <select className="Opc_filtro">
          <option value="1">(Filtrar por)</option> 
            <option value="2">Id venta</option> 
            <option value="3">Id cliente</option> 
            <option value="4">Nombre cliente</option>
        </select>

        <input className="id_user" type="text" name="user"></input>
        <button className="boton_buscar">Buscar</button>
        <Link to='/NewSales'>
          <p className='L_Nuevo'>Nueva venta</p>
        </Link> 
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

        <Link >
          <p className='L_Actualizar'>Actualizar</p>
        </Link>    

      </div>
      <Footer/>
    </div>
  );
}

export default Sales;


