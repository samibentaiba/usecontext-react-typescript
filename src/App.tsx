
import React, { useState, useMemo, useContext, createContext } from 'react';
import './App.css'; // Optional for basic styling

// 1. Create a context type
type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// 2. Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Custom hook for safe context consumption
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 4. ThemeProvider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// 5. Theme toggle button component
const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '10px 20px',
        backgroundColor: theme === 'light' ? '#222' : '#eee',
        color: theme === 'light' ? '#fff' : '#000',
        borderRadius: 8,
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
      }}
    >
      Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

// 6. Main app content that responds to context
const ThemedBox: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        marginTop: 20,
        padding: 20,
        backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
        color: theme === 'light' ? '#333' : '#f0f0f0',
        borderRadius: 12,
        transition: 'all 0.3s ease',
      }}
    >
      <h2>This is a {theme} themed box!</h2>
      <p>The color and background change with context.</p>
    </div>
  );
};

// 7. App root
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div
        style={{
          minHeight: '100vh',
          padding: 40,
          backgroundColor: '#ccc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>🌗 useContext Exercise App</h1>
        <ThemeToggleButton />
        <ThemedBox />
      </div>
    </ThemeProvider>
  );
};

export default App;

