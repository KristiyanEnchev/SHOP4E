import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';
import { useStateContext } from './contexts/ContextProvider';
import { CustomTooltip } from '../components/ui/custom-tooltip.jsx';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer.jsx';
import ThemeSettings from './components/ThemeSettings';
import Users from './components/Users/Users';
import Products from './components/Products/Products';
import { Home } from './components/Home/Home';
import PageNotFound from '../components/common/404/PageNotFound';

const AdminPanel = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <CustomTooltip content="Settings">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </CustomTooltip>
          </div>

          <Sidebar />

          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen ${
              activeMenu ? 'md:ml-72' : ''
            } w-full`}
          >
            <Navbar />

            <div>
              {themeSettings && <ThemeSettings />}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/products" element={<Products />} />
                <Route path="/*" element={<PageNotFound />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminPanel;
