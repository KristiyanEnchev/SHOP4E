import { MdOutlineCancel } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import { useStateContext } from '../contexts/ContextProvider';
import { Button } from '@/components/ui/button';
import { CustomTooltip } from './../../components/ui/custom-tooltip';

// eslint-disable-next-line react-refresh/only-export-components
export const themeColors = [
  { name: 'Blue Theme', color: '#1A97F5' },
  { name: 'Green Theme', color: '#03C9D7' },
  { name: 'Purple Theme', color: '#7352FF' },
  { name: 'Red Theme', color: '#FF5C8E' },
  { name: 'Indigo Theme', color: '#1E4DB7' },
  { name: 'Orange Theme', color: '#FB9678' },
];

const ThemeSettings = () => {
  const { setThemeSettings, currentMode, setMode, currentColor, setColor } =
    useStateContext();

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('settings-overlay')) {
      setThemeSettings(false);
    }
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-end z-[9999] settings-overlay"
      onClick={handleClickOutside}
    >
      <div
        className="h-screen w-80 md:w-96 dark:text-gray-200 bg-white dark:bg-gray-800 shadow-lg overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
          <h2 className="font-semibold text-xl">Settings</h2>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            onClick={() => setThemeSettings(false)}
          >
            <MdOutlineCancel className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-64px)]">
          {/* Theme Mode Section */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Theme Mode</h3>
            <div className="space-y-3">
              {['Light', 'Dark'].map((mode) => (
                <label
                  key={mode}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="theme"
                    value={mode}
                    checked={currentMode === mode}
                    onChange={handleModeChange}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="group-hover:text-primary transition-colors">
                    {mode}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Theme Colors Section */}
          <section className="border-t dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold mb-4">Theme Colors</h3>
            <div className="grid grid-cols-3 gap-4">
              {themeColors.map((item) => (
                <CustomTooltip key={item.name} content={item.name}>
                  <Button
                    variant="ghost"
                    className="h-12 w-full rounded-lg p-0 relative overflow-hidden transition-transform hover:scale-105"
                    style={{ backgroundColor: item.color }}
                    onClick={() => setColor(item.color)}
                  >
                    {item.color === currentColor && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <BsCheck className="text-2xl text-white" />
                      </div>
                    )}
                  </Button>
                </CustomTooltip>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
