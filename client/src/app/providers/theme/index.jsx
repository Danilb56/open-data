import { createContext, useEffect, useState } from 'react';

const LOCAL_STORAGE_THEME_KEY = 'theme';

const ThemeContext = createContext();

const getTheme = () => {
  const theme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
  return theme || 'light';
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
