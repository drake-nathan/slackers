import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import MessageInput from './components/SocketInputTest';

function App() {
  return (
    <Router>
      <Sidebar />
      <MessageInput />
    </Router>
  );
}

export default App;
