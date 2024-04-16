import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'

import Dashboard from './components/Dashboard'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Route exact path="/dash" component={Dashboard} />
    </Switch>
  </BrowserRouter>
)

export default App
