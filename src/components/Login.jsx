import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="overlay">
    <form>
      <div className="con">
        <header className="head-form">
          <h2>Bienvenido</h2>
          <br></br>
          <p>Ingrese su usuario y contraseña</p>
        </header>
        <br></br>
      
      <div className="field-set">        
        <br></br>    
        <Link to='/menu'>
          <p>Ingresar</p>        
        </Link>          
      </div>
      </div>
    </form>
    
  </div> 


  );
}

export default Login;