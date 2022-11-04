import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Login from './components/Login';
import Chat from './components/Chat';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light');
  const toggleTheme = () => {
    console.log(theme);
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/chat",
      element: <Chat />
    },
    {
      path: "/*",
      element: <div>Oops !!!</div>,
    },
  ]);


  return (
    <div className={`App ${theme}`}>
       <CssBaseline />
      <button onClick={toggleTheme}>Toggle Theme</button>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
