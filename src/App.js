import './App.css';
import Landing from './components/Landing';
import Signup from './components/Signup';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserCodes from './components/UserCodes';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/landing" element={<Landing />} />
        <Route exact path="/snippets" element={<UserCodes />} />
      </Routes>
    </Router>
  );
}

export default App;
