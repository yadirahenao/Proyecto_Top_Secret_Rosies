import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'styles/styles.css'
import 'styles/Navbar.css'
import 'styles/Login.css'
import 'styles/NewProducts.css'
import 'styles/Users.css'
import 'App.css'

import Navbar from 'Navbar/Navbar';
import Index from 'pages';
import Home from 'pages/Home';
import Sales from 'pages/Sales';
import NewSales from 'pages/NewSale';
import NewProducts from 'pages/NewProducts';
import Products from 'pages/Products';
import Configuration from 'pages/Configuration';

function App() {
  return (
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
          <Route path='/'> <Index /> </Route>     
        </Switch>        
      </Router>
    </div>    
  );
}

export default App;


