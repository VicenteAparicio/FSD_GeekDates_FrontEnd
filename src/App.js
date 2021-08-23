// IMPORT MOTORS
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// IMPORT STYLE
import './App.scss';
// IMPORT CONTAINERS
import Home from './containers/Home/home';
import Register from './containers/Register/register';
import Login from './containers/Login/login';
import UpdateInfo from './containers/UpdateInfo/updateInfo';
import UpdateSexualInfo from './containers/UpdateSexualInfo/updateSexualInfo';
import Profile from './containers/Profile/profile';
import Hobbies from './containers/Hobbies/hobbies';
import Search from './containers/Search/search';
import Nav from './components/Nav/nav.jsx';
import Matches from './containers/Matches/matches';



function App() {
  return (
    <div className="App font">
      <BrowserRouter>
        <Nav/>
        
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/updateinfo" exact component={UpdateInfo}/>
          <Route path="/updatesexualinfo" exact component={UpdateSexualInfo}/>
          <Route path="/profile" exact component={Profile}/>
          <Route path="/hobbies" exact component={Hobbies}/>
          <Route path="/search" exact component={Search}/>
          <Route path="/matches" exact component={Matches}/>
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
