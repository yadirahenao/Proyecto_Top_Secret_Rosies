import React from 'react';
import Logo from 'media/google_logo.png';
import ImagenLogo from './ImagenLogo';
import { useAuth0 } from "@auth0/auth0-react";


function Login() {
  const { loginWithRedirect } = useAuth0();
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
            <button 
              onClick={() => loginWithRedirect()}>Iniciar sesion</button>
          </div>              
      </div>

      </div>
    </form>    
  </div> 
  );
}

export default Login;
