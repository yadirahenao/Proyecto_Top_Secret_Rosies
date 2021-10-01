import React from 'react';
import { Link } from 'react-router-dom';

function NewSales() {
  return (
    <><div class="form">
      <div class="form-toggle"></div>
      <div lass="form-panel one">
        <div class="form-header">
          <h1>Nueva Venta</h1>
          <br></br>
          <h3>Ingrese los datos para crear una nueva venta</h3>
        </div>
        <div class="form-content">
          <form>
            <div class="form-group">
              <label for="ID">ID</label>
              <input type="text" id="ID" name="ID" required="required" />
            </div>

            <div class="form-group">
              <label for="Descrpcion">Descrpción</label>
              <input type="Descrpcion" id="Descrpcion" name="Descrpcion" required="required" />
            </div>

            <div class="form-group">
              <label for="Precio">Precio</label>
              <input type="Precio" id="Precio" name="Precio" required="required" />
            </div>

            <div class="form-group">
              <label for="Estado">ESTADO</label>
            </div>

            <div class="product-status">
              <select name="Estado">
                <option selected value="0">Elige una opción</option>
                <option value="1">Disponible</option>
                <option value="1">No Disponible</option>
                <option value="1">Oculto</option>
              </select>
            </div>

            <br></br>

            <div class="form-group">
              <button type="submit">Guardar información</button>
            </div>

            <Link to='/Sales'>
              <p>Regresar</p>
            </Link>

          </form>
        </div>
      </div>

    </div>
    </>
  );
}

export default NewSales;