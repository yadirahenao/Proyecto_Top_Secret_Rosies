import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'styles/styles.css'
import 'styles/Navbar.css'
import 'styles/Login.css'
import 'styles/Int_Secund.css'
import 'styles/Int_modulos.css'
import 'App.css'

import Navbar from 'components/Navbar';
import Index from 'pages';
import Home from 'pages/Home';
import Sales from 'pages/Sales';
import NewSales from 'pages/NewSale';
import NewProducts from 'pages/NewProducts';
import Products from 'pages/Products';
import Configuration from 'pages/Configuration';
import NewUser from 'pages/NewUser';
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <Auth0Provider
      domain="misiontic-tsr.us.auth0.com"
      clientId="sZdjwhCVXbbhTzZKaqN80mqBDvejHTyr"
      redirectUri="http://localhost:3000/home"
    >
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/Menu'> <Navbar/> </Route>
          <Route path='/Home'><Navbar/><Home/></Route>   
          <Route path='/Sales'><Navbar/><Sales/> </Route>
          <Route path='/NewSales'><Navbar/><NewSales/> </Route>
          <Route path='/Products'><Navbar/><Products/></Route>
          <Route path='/NewProducts'><Navbar/><NewProducts/></Route>
          <Route path='/Configuration'> <Navbar/><Configuration/></Route>   
          <Route path='/NewUser'> <Navbar/><NewUser/></Route>          
          <Route path='/'> <Index /> </Route>     
        </Switch>        
      </Router>
    </div> 
    </Auth0Provider>   
  );
}

export default App;


