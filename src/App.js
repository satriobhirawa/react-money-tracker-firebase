import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/home/Home.js";
import Login from "./pages/login/Login.js";
import Signup from "./pages/signup/Signup.js";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && <Home /> }
            </Route>
            <Route path="/login">
              {!user && <Login /> }
              {user && <Redirect to="/" />}
            </Route>
            <Route path="/signup">
              {user && <Redirect to="/" />}
              {!user &&<Signup />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
