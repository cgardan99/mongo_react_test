import React from 'react'
import CRUD from './components/CRUD'
import ConsultaIndividual from './components/ConsultaIndividual'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
 
  return (
    <Router>
      <div className="w-screen bg-blue-200">
          <Switch>
            <Route path="/user/:_id">
              <ConsultaIndividual />
            </Route>
            <Route path="/">
              <CRUD />
            </Route>
          </Switch>
        </div>
    </Router>
  )
}

export default App