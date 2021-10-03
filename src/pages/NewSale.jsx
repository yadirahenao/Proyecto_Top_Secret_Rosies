import React from 'react';
import { Link } from 'react-router-dom';
import Footer from 'components/Footer';

function NewSales() {
  return (
    <>
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
            <div className="info">
          <div className="form-group">
              <label for="Fecha">Fecha</label>
              <input type="text" id="Fecha" name="Fecha" required="required" />
          </div>
          <br />

            <div className="form-group">
              <label for="ID">ID Venta</label>
              <input type="text" id="ID" name="ID" required="required" />
            </div>
            <br />

            <div className="form-group">
              <label for="Vendedor">Vendedor</label>
              <input type="text" id="Vendedor" name="Vendedor" required="required" />
            <br />
            </div>
            </div>

            <div className="infoVenta">
            <div className="form-group">
              <label for="Cliente">Cliente</label>
              <input type="text" id="Cliente" name="Cliente" required="required" />
            </div>

            <div className="form-group">
              <label for="Documento">Número de Documento</label>
              <input type="text" id="Documento" name="Documento" required="required" />
            </div>

            <div className="form-group">
              <label for="Dirección">Dirección</label>
              <input type="text" id="Dirección" name="Dirección" required="required" />
            </div>

            <div className="form-group">
              <label for="Correo">Correo</label>
              <input type="text" id="Correo" name="Correo" required="required" />
            </div>
            </div>

            <br />
            <center>
            <table  class="table" border="solid" cellPadding="10" cellSpacing="0">
              <tr align="center">
                <td><strong>Codigo</strong></td>
                <td><strong>Producto</strong></td>
                <td><strong>Cantidad</strong></td>
                <td><strong>Precio</strong></td>
                </tr>
                <tr align="center">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  </tr>
                  <tr align="center">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    </tr>
                    
                    <tr align="center">
                      <td><strong>Valor Total</strong></td>
                      <td colSpan="3"></td>
                      </tr>
            </table>
            </center>
            
            <br />
            <div className="form-group">
              <label for="Descrpcion">Descrpción</label>
              <input type="Descrpcion" id="Descrpcion" name="Descrpcion" required="required" />
            </div>
            <br />
                  
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
    </>
  );
}

export default NewSales;