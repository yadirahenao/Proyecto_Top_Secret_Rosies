import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'styles/styles.css'
import 'styles/Login.css'
import 'styles/Navbar.css'
import 'Navbar/Navbar'
import Navbar from 'Navbar/Navbar';
import Index from 'pages';
import Home from 'pages/Home';
import Sales from 'pages/Sales';
import Products from 'pages/Products';
import Configuration from 'pages/Configuration';

function App() {
  return (
    <div className='App'>
      <Router>              
        <Switch>
          <Route path='/Menu'> <Navbar/> </Route>

          <Route path='/'> <Index /> </Route>
        </Switch>        
      </Router>
    </div>    
  );
}



export default App;


