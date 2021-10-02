import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'media/google_logo.png';
import ImagenLogo from './ImagenLogo';

function Login() {
  return (
        
    <div className="overlay">
      <div className="logo-tsr">
        <ImagenLogo/>
      </div>

    <form>
      <div className="con">
        <header className="form-header">
          <h1>BIENVENIDO</h1>
        </header>
        <br></br>  

      <div className="field-set">              
      <img className = 'logo-google' src={Logo}></img>
          <br></br>
          <div className ="L_Ingresar">
          <Link  to='/Home'>
            <p>Iniciar sesion con google</p>
          </Link>   
          </div>              
      </div>

      </div>
    </form>    
  </div> 
  );
}

export default Login;