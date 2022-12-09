// Importing Page from page
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Users from './pages/Users';
import AdminCms from './pages/AdminCms';

// Import Router from React 
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/admin-cms" element={<AdminCms/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;