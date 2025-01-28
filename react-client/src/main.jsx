import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App.jsx';
import store from './redux/store.js';
import AdminPanel from './Admin/AdminPanel.jsx';
import ContextProvider from './Admin/contexts/ContextProvider.jsx';
import RequireAuthorization from './components/AuthComponent/RequireAuthorization.jsx';
import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <ContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />}></Route>
              <Route element={<RequireAuthorization />}>
                <Route path="/admin/*" element={<AdminPanel />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ContextProvider>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
