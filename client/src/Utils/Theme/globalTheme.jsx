/**
 * Theme Hook for CSS Custom Properties
 *
 * This hook provides access to the CSS custom properties theme system
 * that replaced the MUI theme in the shadcn/ui migration.
 */

import { useContext, createContext, useState } from 'react';

// Create a simple theme context for backward compatibility
const ThemeContext = createContext({
  mode: 'dark',
  toggleColorMode: () => {},
});

export const useTheme = () => {
  // For now, return a simple object that mimics MUI theme structure
  // but uses CSS custom properties internally

  return {
    palette: {
      primary: {
        main: 'var(--color-primary-main)',
        contrastText: 'var(--color-primary-contrast-text)',
        contrastTextSecondary: 'var(--color-primary-contrast-text-secondary)',
        contrastTextTertiary: 'var(--color-primary-contrast-text-tertiary)',
        lowContrast: 'var(--color-primary-low-contrast)',
      },
      secondary: {
        main: 'var(--color-secondary-main)',
        contrastText: 'var(--color-secondary-contrast-text)',
      },
      accent: {
        main: 'var(--color-accent-main)',
        contrastText: 'var(--color-accent-contrast-text)',
        darker: 'var(--color-accent-darker)',
      },
      tertiary: {
        main: 'var(--color-tertiary-main)',
        contrastText: 'var(--color-tertiary-contrast-text)',
      },
      error: {
        main: 'var(--color-error-main)',
        contrastText: 'var(--color-error-contrast-text)',
        lowContrast: 'var(--color-error-low-contrast)',
      },
      success: {
        main: 'var(--color-success-main)',
        contrastText: 'var(--color-success-contrast-text)',
        lowContrast: 'var(--color-success-low-contrast)',
      },
      alert: {
        main: 'var(--color-alert-main, #f59e0b)',
        contrastText: 'var(--color-alert-contrast-text, #ffffff)',
      }
    },
    spacing: (factor) => `var(--spacing-${factor})`,
    shape: {
      borderRadius: 'var(--border-radius)',
    },
    typography: {
      h1: {
        fontSize: 'var(--font-size-h1)',
        color: 'var(--color-primary-contrast-text)',
        fontWeight: 500,
      },
      h2: {
        fontSize: 'var(--font-size-h2)',
        color: 'var(--color-primary-contrast-text-secondary)',
        fontWeight: 400,
      },
      body1: {
        fontSize: 'var(--font-size-body1)',
        color: 'var(--color-primary-contrast-text-tertiary)',
        fontWeight: 400,
      },
      body2: {
        fontSize: 'var(--font-size-body2)',
        color: 'var(--color-primary-contrast-text-tertiary)',
        fontWeight: 400,
      },
    },
  };
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const value = {
    mode,
    toggleColorMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default useTheme;