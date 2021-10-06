import React from 'react';
import { Link } from 'react-router-dom';
import Footer from 'components/Footer'

function NewSales() {
  return (
    <div>
    <div>
      <h1 className='t_modulo'> Gestión de ventas</h1>
    </div>
    <div className="form">
      <div className="form-toggle"></div>
      <div lass="form-panel one">
        <div className="form-header">
          <h2>Nueva Venta</h2>
          <br></br>
          <h3>Ingrese los datos para crear una nueva venta</h3>
        </div>
        <div className="form-content">
          <br/>
         
          <div>        
             <div className="form-group">
              <label for="ID">ID Venta</label>
              <input type="text" id="ID" name="ID" required="required" />
            </div>

            <div className="form-group">
              <label for="Cliente">Cliente</label>
              <input type="text" id="Cliente" name="Cliente" required="required" />
            </div>

            <div className="form-group">
              <label for="Documento">Número de Documento</label>
              <input type="text" id="Documento" name="Documento" required="required" />
            </div>

            <div className="form-group">
              <label for="Producto">Producto</label>
              <input type="text" id="Producto" name="Producto" required="required" />
            </div>

            <div className="form-group">
              <label for="Cantidad">Cantidad</label>
              <input type="text" id="Cantidad" name="Cantidad" required="required" />
            </div>

            <div className="form-group">
              <label for="Precio">Precio</label>
              <input type="text" id="Precio" name="Precio" required="required" />
            </div>

            <div className="form-group">
              <label for="Valor Total">Valor Total</label>
              <input type="text" id="Valor Total" name="Valor Total" required="required" />
            </div>

            <div className="form-group">
              <label for="Vendedor">Vendedor</label>
              <input type="text" id="Vendedor" name="Vendedor" required="required" />
            </div>
                  
            <div className="form-group">
              <label for="Estado">Estado de la Venta</label>
            </div>

            <div className="product-status">
              <select name="Estado">
                <option selected value="0">Elige una opción</option>
                <option value="1">En Proceso</option>
                <option value="1">Cancelada</option>
                <option value="1">Entregada</option>
              </select>
            </div>

            <br></br>
            
            <div className="form-group">
              <button type="submit">Guardar información</button>
            </div> 

            <Link to='/Sales'>
              <p className='L_Regresar'>Regresar</p>
            </Link>
          </div>
       
        </div>
      </div>      
    </div>
    <Footer/>
    </div>
  );
}

export default NewSales;