import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import UserPage from './components/UserPage';
import { AuthProvider } from './context';

// by wrapping our application in the custom authentication provider(AuthProvider) detailed in the context folder, this ensures that every component in our application has access to the context objects we created earlier.
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
