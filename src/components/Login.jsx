import { Link } from 'react-router-dom';

function Login() {
  return (
    <div class="overlay">
    <form>
      <div class="con">
        <header class="head-form">
          <h2>Bienvenido</h2>
          <br></br>
          <p>Ingrese su usuario y contraseña</p>
        </header>
        <br></br>
      <div class="field-set">        
        <br></br>
        <button class="log-in">Ingresar</button>            
      </div>
      </div>
    </form>
  </div>        
  );
}

export default Login;