import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Mylist from "./components/my-list/Mylist";
import VipMovie from "./components/vip-movie/VipMovie";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import 'antd/dist/antd.css';

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
        {user && (
          <>
            <Route path="/movies">
              <Home type="movie" />
            </Route>
            <Route path="/vip">
              <VipMovie />
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
            <Route path="/my-favorites">
              <Mylist />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
