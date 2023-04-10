import React, { useState, useEffect } from 'react';
import { Box,Button } from '@mui/material';
//Routes
import AdminRoutes from './admin/AdminRoutes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoutes from './user1/UserRoutes';
import Goto from './Component/ComponentRoutes';
import Footer from './Component/Structure/Footer';
import UserState from './context/users/UserState';
//tranlate
import { i18nContext, setLanguage } from './Translate/i18n';
import i18next from 'i18next';
//color
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from "./Theme";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


function App() {

   //Translate
   const [lang, setLang] = useState('en');

   //handeling language change
   const handleLangChange = () => {
      const newLang = lang === 'en' ? 'hindi' : 'en';
      setLang(newLang);
      //setting in context
      setLanguage(newLang);
   };

   //color
   const [isDarkMode, setIsDarkMode] = useState(false);

   //changing color theme in html(because of chakra theme need to change html theme)
   useEffect(() => {
      const colorMode = isDarkMode ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', colorMode);
   }, [isDarkMode]);

   //changing color of whole website
   const handleThemeChange = () => {
      setIsDarkMode(!isDarkMode);
   };

   return (
      <>
         <UserState>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
               <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
                  <i18nContext.Provider value={{ lang, t: i18next.t.bind(i18next) }}>
                     <Router>
                        <Routes>     {/* it is taking all the routes because of * */}
                           {/*Route before login*/}
                           <Route path='/*' element={<Goto />}></Route>
                           {/*Route afterlogin*/}
                           <Route path='/User/*' element={<UserRoutes />}></Route>
                           {/*Route for Admin*/}
                           <Route path='/admin/*' element={<AdminRoutes />}></Route>
                        </Routes>
                        <Box sx={{ position: "fixed", top: '80px', right: { md: "60px", xs: "20px" } }}>
                           <Button onClick={handleThemeChange}>{isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}</Button>
                           <Button onClick={handleLangChange} style={{ width: "30px", border: "none" }}>{lang === "en" ? "भाषा" : "LANG"}</Button>
                        </Box>
                        <Footer />
                     </Router>
                  </i18nContext.Provider>
               </div>
            </ThemeProvider>
         </UserState>
      </>

   );

}

export default App;
