import Index from 'pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'styles/styles.css'

function App() {
  return (
    <div className='App'>
      <Router>        
          <Switch>

            <Route path='/'>
              <Index />
            </Route>
          </Switch>        
      </Router>
    </div>    
  );
}

export default App;
