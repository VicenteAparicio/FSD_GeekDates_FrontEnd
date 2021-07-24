// IMPORT MOTORS
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// IMPORT CONTAINERS
import Home from './containers/Home/home';
import Register from './containers/Register/register';
import Login from './containers/Login/login';


import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
