import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="overlay">
    <form>
      <div className="con">
        <header className="form-header">
          <h1>Bienvenido</h1>
          <br></br>
          <p>Ingrese su usuario y contraseña</p>
        </header>
        <br></br>
      
      <div className="field-set">        
        <br></br>    
        <Link to='/Home'>
          <p className='L_Ingresar'>Ingresar</p>        
        </Link>          
      </div>
      </div>
    </form>    
  </div> 
  );
}

export default Login;