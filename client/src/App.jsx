import React, { useMemo } from 'react'
import {Routes, Route, Navigate,BrowserRouter} from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import {ProfilePage} from './Pages/profilePage/ProfilePage';
import HomePage from './Pages/homePage/HomePage';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from './theme';
import {MessagePage} from "./Pages/messagePage/MessagePage";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));



  return (
    <div className='app'>
      <BrowserRouter >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<LoginPage />}></Route>
            <Route path='/home' element={isAuth ? <HomePage /> : <Navigate to="/" />} > </Route>
            <Route path='/profile/:userId' element = {isAuth ? <ProfilePage /> : <Navigate to="/" />} ></Route>
            <Route path='/messages' element = {isAuth ? <MessagePage /> : <Navigate to="/" />} ></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
