import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import Login from './components/Login';
import UserPage from './components/UserPage'

function App() {
  return (
    <React.Fragment>
    <Router>
      <Redirect to='/login' />
      <Switch>
        <Route exact path='/login' component={() => <Login /> } />
        <Route exact path='/user' component={() => <UserPage />} />
      </Switch>
    </Router>

    </React.Fragment>
  );
}

export default App;
