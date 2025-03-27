import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Dashboard from './components/Dashboard';
import Results from './components/Results';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz/:category" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;