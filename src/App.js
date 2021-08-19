// IMPORT MOTORS
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// IMPORT CONTAINERS
import Home from './containers/Home/home';
import Register from './containers/Register/register';
import Login from './containers/Login/login';
import UpdateInfo from './containers/UpdateInfo/updateInfo';
import UpdateSexualInfo from './containers/UpdateSexualInfo/updateSexualInfo';
import Profile from './containers/Profile/profile';
import Hobbies from './containers/Hobbies/hobbies';


import './App.scss';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/updateinfo" exact component={UpdateInfo}/>
          <Route path="/updatesexualinfo" exact component={UpdateSexualInfo}/>
          <Route path="/profile" exact component={Profile}/>
          <Route path="/hobbies" exact component={Hobbies}/>
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
