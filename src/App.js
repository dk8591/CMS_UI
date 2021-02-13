import { BrowserRouter, Switch, Route } from "react-router-dom";
import {  Redirect} from "react-router";
import Login from './components/Login';
import Bloglist from './components/Blogentries/Blogentrieslist';
import Userlist from './components/User/Userlist';
import Detailpage from './components/Home/Detailpage';
import Home from './components/Home/Homepage';
import Commentslist from './components/Blogentries/Commentslist';
import './App.css';

function App() {
  return (
    
    <BrowserRouter>
        <Switch>          
      <Route   path={'/Login'} component={Login}/>
      <Route   path={'/home'} component={Home}/>

      <Route   path={'/userlist'} component={Userlist}/>
      
      <Route   path={'/bloglist'} component={Bloglist}/>
    
      <Route   path={'/blogpost'} component={Detailpage}/>
      <Route   path={'/commentlist'} component={Commentslist}/>
      <Redirect from="" to="/Login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
