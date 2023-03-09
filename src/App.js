import logo from './logo.svg';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/landing" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
