import './App.css';
import Home from './Pages/Home';
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  HashRouter as Router,
} from "react-router-dom";
import BillDetails from './Pages/BillDetails';

function App() {
  return (
    <Router basename="/">
      <Switch>
        <Route path="/generatebill">
          <Home />
        </Route>
        <Route path="/bills">
          <BillDetails />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
