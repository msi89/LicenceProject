import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios'
import Home from './pages/Home'
import Login from './pages/Login'

export default function App() {

  React.useEffect(() => {
    axios.get('/api/drives/documents').then(res => console.log(res.data)).catch(err => console.error(err.response))
  }, [])
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
