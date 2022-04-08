import './normalize.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import UserPage from './components/UserPage';
import { AuthProvider } from './context';
import AllUsers from './components/user-components/AllUsers';

// by wrapping our application in the custom authentication provider(AuthProvider) detailed in the context folder, this ensures that every component in our application has access to the context objects we created earlier.

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/user" component={UserPage} />
          <Route path="/people">
            <AllUsers />
          </Route>
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
