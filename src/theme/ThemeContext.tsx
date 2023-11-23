import React, { createContext, useContext, useState, ReactNode } from "react";
import { defaultTheme, Theme } from "./theme";

interface ThemeContextProps {
  theme: Theme;
  updateTheme: (options: {
    colors?: Record<string, string>;
    spacing?: Record<string, string | number>;
    fontSize?: Record<string, string | number>;
    fontFamily?: Record<string, string>;
  }) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const updateTheme = ({
    colors = {},
    spacing = {},
    fontSize = {},
    fontFamily = {},
  }: {
    colors?: Record<string, string>;
    spacing?: Record<string, string | number>;
    fontSize?: Record<string, string | number>;
    fontFamily?: Record<string, string>;
  }) => {
    const newTheme: Theme = {
      colors: { ...colors, ...defaultTheme.colors },
      spacing: { ...spacing, ...defaultTheme.spacing },
      fontSize: { ...fontSize, ...defaultTheme.fontSize },
      fontFamily: { ...fontFamily, ...defaultTheme.fontFamily },
    };

    setTheme(newTheme);
  };

  const value: ThemeContextProps = { theme, updateTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
