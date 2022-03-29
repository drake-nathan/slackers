import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import InputForm from './components/InputForm';

function App() {
  return (
    <Router>
      <Sidebar />
      <InputForm />
    </Router>
  );
}

export default App;
