import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Match from './pages/Match';
import Chat from './pages/Chat';
import Feedback from './pages/Feedback';
import AdminDashboard from './pages/AdminDashboard';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';

function NavTabs() {
  const location = useLocation();
  const tabValue =
    location.pathname === '/match' ? 1 :
    location.pathname === '/chat' ? 2 :
    location.pathname === '/feedback' ? 3 :
    location.pathname === '/admin' ? 4 : 0;
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Lone Town</Typography>
        <Tabs value={tabValue} textColor="inherit" indicatorColor="secondary">
          <Tab label="Onboarding" component={Link} to="/" />
          <Tab label="Match" component={Link} to="/match" />
          <Tab label="Chat" component={Link} to="/chat" />
          <Tab label="Feedback" component={Link} to="/feedback" />
          <Tab label="Admin" component={Link} to="/admin" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <Router>
      <NavTabs />
      <Box sx={{ minHeight: '90vh', bgcolor: '#f5f5f5' }}>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/match" element={<Match />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
