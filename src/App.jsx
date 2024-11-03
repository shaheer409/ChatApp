import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Chat from './pages/Chat/Chat';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        
      </Routes>
    </Router>
  );
}

export default App;
