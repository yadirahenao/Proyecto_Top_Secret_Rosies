import Index from 'pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'styles/styles.css'
import 'Navbar/Navbar'
import Navbar from 'Navbar/Navbar';
import 'styles/Navbar.css'

function App() {
  return (
    <div className='App'>
      <Router>        
          <Switch>
          <Route path='/Menu'>
              <Navbar/>
            </Route>
            <Route path='/'>
              <Index />
            </Route>
          </Switch>        
      </Router>
    </div>    
  );
}

export default App;
