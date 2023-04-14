import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaAngleUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      {showTopBtn && (
        <FaAngleUp
          onClick={goToTop}
          className="fixed bottom-10 right-6 z-20 h-12 w-12 cursor-pointer rounded-full border-2 border-gray-400 bg-primary p-3 text-white transition-all duration-500 ease-in-out animate-move-up-down hover:animate-none hover:bg-white hover:text-primary hover:border-[#162636]"
        />
      )}
    </div>
  );
};

export default ScrollToTop;
