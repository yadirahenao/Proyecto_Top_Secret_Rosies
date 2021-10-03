import React from 'react';
import { Link } from 'react-router-dom';
import Footer from 'components/Footer';

function NewUser() {
  return (
    <>
    <div>
      <h1 className='t_modulo'> Gestión de usuarios</h1>
    </div>
    <div className="form">
      <div className="form-toggle"></div>
      <div lass="form-panel one">
        <div className="form-header">
          <h2>Nuevo Usuario</h2>
          <br></br>
          <h3>Ingrese los datos para crear un nuevo usuario</h3>
        </div>
        <div className="form-content">
        <form className='form-second'>
            <div className="form-group">
              <label for="ID">Id usuario</label>
              <input type="text" id="ID" name="ID" required="required" />
            </div>

            <div className="form-group">
              <label for="nombre">Nombre</label>
              <input type="nombre" id="nombre" name="nombre" required="required" />
            </div>

            <div className="form-group">
              <label for="apellido">Apellido</label>
              <input type="apellido" id="apellido" name="apellido" required="required" />
            </div>

            <div className="form-group">
              <label for="correo">Correo</label>
              <input type="correo" id="correo" name="correo" required="required" />
            </div>


            <div className="form-group">
              <label for="Estado">Estado</label>
            </div>

            <div className="product-status">
              <select name="Estado">
                <option selected value="0">Elige una opción</option>
                <option value="1">Pendiente</option>
                <option value="1">Autorizado</option>
                <option value="1">No autorizado</option>     
              </select>
            </div>

            <div className="form-group">
              <label for="Rol">Rol</label>
            </div>

            <div className="product-status">
              <select name="rol">
                <option selected value="0">Elige una opción</option>
                <option value="1">Administrador</option>
                <option value="1">Vendedor</option>     
              </select>
            </div>

            <br></br>

            <div className="form-group">
              <button type="submit" onClick={event => alert(event.target.id)}>
              <p  id="Usuario Creado Exitosamente">Guardar información</p>
              </button>
            </div>

            <Link to='/Configuration'>
              <p className='L_Regresar'>Regresar</p>
            </Link>

          </form>
        </div>
      </div>

    </div>
    <Footer/>
    </>
  );
}

export default NewUser;