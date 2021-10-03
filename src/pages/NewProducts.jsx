import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from 'components/Footer';

const NewProducts = () => {
  const [ID, setID] = useState('');

  useEffect(() => {
    console.log(
      ''
    );
  }, []);

  useEffect(() => {
    console.log ('');
    console.log ('', ID );
  }, [ID]);


  const enviarDatosBackend = () => {
    console.log ('Dato2', ID)
  };

  return (
    <>
    <div>
      <h1 className='t_modulo'> Gestión de productos</h1>
    </div>
    <div className="form">
      <div className="form-toggle"></div>
      <div lass="form-panel one">
        <div className="form-header">
          <h2>Crear producto</h2>
          <br></br>
          <h3>Ingrese los datos para crear un nuevo producto</h3>
        </div>
        <div className="form-content">
          <form className='form-second'>
            <div className="form-group">
              <label for="ID">ID</label>
              <input 
              onChange={(e) => {
                setID(e.target.value);
              }}
              value={ID}
              type="text" id="ID" name="ID" required="required" />
            </div>

            <div className="form-group">
              <label for="Descrpcion">DESCRIPCIÓN</label>
              <input 
              onChange={(e) => {
                console.log(e.target.value);
              }}
              
              type="Descrpcion" id="Descripcion" name="Descrpcion" required="required" />
            </div>

            <div className="form-group">
              <label for="Precio">VALOR UNITARIO</label>
              <input 
              onChange={(e) => {
                console.log(e.target.value);
              }}
              type="Precio" id="Precio" name="Precio" required="required" />
            </div>

            <div className="form-group">
              <label for="Estado">ESTADO</label>
            </div>

            <div className="product-status">
              <select name="Estado">
                <option selected value="0">Elige una opción</option>
                <option value="1">Disponible</option>
                <option value="1">No Disponible</option>
              </select>
            </div>

            <br></br>

            <div className="form-group">
              <button type="button" onClick={enviarDatosBackend} onClick={event => alert(event.target.id)}>
              <p  id="Producto Creado Exitosamente">Guardar información</p>
              </button>
            </div>

            <Link to='/Products'>
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

export default NewProducts;