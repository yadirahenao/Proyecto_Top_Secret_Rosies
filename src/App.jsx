import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div class="overlay">
        <form>
          <div class="con">
            <header class="head-form">
              <h2>Bienvenido</h2>
              <p>Ingrese su usuario y contraseña</p>
            </header>
            <br></br>
          <div class="field-set">
            <span class="input-item">
              <i class="fa fa user-circle"></i>
            </span>
            <input class="form-input" id="txt-input" type="text" placeholder="Nombre de usuario" required></input>
            <br></br>
            
            <span class="input-item">
              <i class="fa fa-key"></i>
            </span>
            <input class="form-input" type="password" placeholder="Contraseña" id="pwd"  name="password" required></input>

            <span>
              <i class="fa fa-eye" aria-hidden="true" type="button" id="eye"></i>
            </span>

            <br></br>
            <button class="log-in">Ingresar</button>            
          </div>

          <div class="other">
            <button class="btn submits frgt-pass">Has olvidado tu contraseña</button>
          </div>

          </div>
        </form>
      </div>
    
    </div>
  );
}

export default App;
