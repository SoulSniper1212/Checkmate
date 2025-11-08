/**
 * Shadcn-compatible theme utilities for the migrated components
 * This file provides theme helpers that work with CSS custom properties
 * and maintain compatibility with the existing design system
 */

// Color utilities for converting hex colors to HSL
function hexToHSL(hex) {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse hex values
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find the maximum and minimum values
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  // Convert to degrees, percentages
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}

// Original color palette from constants.js
const originalColors = {
  offWhite: "#FEFEFE",
  offBlack: "#131315",
  gray0: "#FDFDFD",
  gray10: "#F4F4FF",
  gray50: "#F9F9F9",
  gray100: "#F3F3F3",
  gray200: "#EFEFEF",
  gray250: "#DADADA",
  gray500: "#A2A3A3",
  gray900: "#1c1c1c",
  blueGray50: "#E8F0FE",
  blueGray500: "#475467",
  blueGray600: "#344054",
  blueGray800: "#1C2130",
  blueGray900: "#515151",
  blueBlueWave: "#1570EF",
  lightBlueWave: "#CDE2FF",
  green100: "#67cd78",
  green200: "#4B9B77",
  green400: "#079455",
  green700: "#026513",
  orange100: "#FD8F22",
  orange200: "#D69A5D",
  orange600: "#9B734B",
  orange700: "#884605",
  red100: "#F27C7C",
  red400: "#D92020",
  red600: "#9B4B4B",
  red700: "#980303",
};

// Light theme colors mapped to CSS variables
export const lightTheme = {
  background: hexToHSL(originalColors.offWhite),
  foreground: hexToHSL(originalColors.blueGray800),
  card: hexToHSL(originalColors.offWhite),
  cardForeground: hexToHSL(originalColors.blueGray800),
  popover: hexToHSL(originalColors.offWhite),
  popoverForeground: hexToHSL(originalColors.blueGray800),
  primary: hexToHSL(originalColors.blueBlueWave),
  primaryForeground: hexToHSL(originalColors.offWhite),
  secondary: hexToHSL(originalColors.gray200),
  secondaryForeground: hexToHSL(originalColors.blueGray600),
  muted: hexToHSL(originalColors.gray200),
  mutedForeground: hexToHSL(originalColors.blueGray500),
  accent: hexToHSL(originalColors.blueBlueWave),
  accentForeground: hexToHSL(originalColors.offWhite),
  destructive: hexToHSL(originalColors.red700),
  destructiveForeground: hexToHSL(originalColors.offWhite),
  border: hexToHSL(originalColors.gray250),
  input: hexToHSL(originalColors.gray250),
  ring: hexToHSL(originalColors.blueBlueWave),
  success: hexToHSL(originalColors.green700),
  successForeground: hexToHSL(originalColors.offWhite),
  warning: hexToHSL(originalColors.orange700),
  warningForeground: hexToHSL(originalColors.offWhite),
  error: hexToHSL(originalColors.red700),
  errorForeground: hexToHSL(originalColors.offWhite),
};

// Dark theme colors mapped to CSS variables
export const darkTheme = {
  background: hexToHSL(originalColors.offBlack),
  foreground: hexToHSL(originalColors.blueGray50),
  card: hexToHSL(originalColors.offBlack),
  cardForeground: hexToHSL(originalColors.blueGray50),
  popover: hexToHSL(originalColors.offBlack),
  popoverForeground: hexToHSL(originalColors.blueGray50),
  primary: hexToHSL(originalColors.blueBlueWave),
  primaryForeground: hexToHSL(originalColors.offBlack),
  secondary: hexToHSL(originalColors.gray900),
  secondaryForeground: hexToHSL(originalColors.gray200),
  muted: hexToHSL(originalColors.gray900),
  mutedForeground: hexToHSL(originalColors.gray500),
  accent: hexToHSL(originalColors.blueBlueWave),
  accentForeground: hexToHSL(originalColors.offBlack),
  destructive: hexToHSL(originalColors.red100),
  destructiveForeground: hexToHSL(originalColors.offBlack),
  border: hexToHSL(originalColors.gray900),
  input: hexToHSL(originalColors.gray900),
  ring: hexToHSL(originalColors.blueBlueWave),
  success: hexToHSL(originalColors.green100),
  successForeground: hexToHSL(originalColors.offBlack),
  warning: hexToHSL(originalColors.orange200),
  warningForeground: hexToHSL(originalColors.offBlack),
  error: hexToHSL(originalColors.red100),
  errorForeground: hexToHSL(originalColors.offBlack),
};

// Theme utility functions
export const getThemeColors = (mode) => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

// Apply theme to document root
export const applyTheme = (mode) => {
  const theme = getThemeColors(mode);
  const root = document.documentElement;

  // Apply all CSS custom properties
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  // Add/remove dark class
  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

// Get CSS variable value
export const getCSSVariable = (variable) => {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${variable}`).trim();
};

// Theme-aware className utility
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Status color mapping for consistent colors across components
export const statusColors = {
  up: {
    light: 'text-green-700 bg-green-50 border-green-200',
    dark: 'text-green-400 bg-green-950 border-green-800',
  },
  down: {
    light: 'text-red-700 bg-red-50 border-red-200',
    dark: 'text-red-400 bg-red-950 border-red-800',
  },
  warning: {
    light: 'text-orange-700 bg-orange-50 border-orange-200',
    dark: 'text-orange-400 bg-orange-950 border-orange-800',
  },
  pending: {
    light: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    dark: 'text-yellow-400 bg-yellow-950 border-yellow-800',
  },
  paused: {
    light: 'text-gray-700 bg-gray-50 border-gray-200',
    dark: 'text-gray-400 bg-gray-950 border-gray-800',
  },
  published: {
    light: 'text-green-700 bg-green-50 border-green-200',
    dark: 'text-green-400 bg-green-950 border-green-800',
  },
  unpublished: {
    light: 'text-red-700 bg-red-50 border-red-200',
    dark: 'text-red-400 bg-red-950 border-red-800',
  },
};

// HTTP status color mapping
export const httpStatusColors = {
  '2xx': {
    light: 'text-green-600 border-green-400',
    dark: 'text-green-400 border-green-600',
  },
  '3xx': {
    light: 'text-blue-600 border-blue-400',
    dark: 'text-blue-400 border-blue-600',
  },
  '4xx': {
    light: 'text-yellow-600 border-yellow-400',
    dark: 'text-yellow-400 border-yellow-600',
  },
  '5xx': {
    light: 'text-red-600 border-red-400',
    dark: 'text-red-400 border-red-600',
  },
  default: {
    light: 'text-gray-600 border-gray-400',
    dark: 'text-gray-400 border-gray-600',
  },
};

// Get status color based on status code
export const getHttpStatusColor = (status, mode = 'light') => {
  if (!status) return httpStatusColors.default[mode];

  const statusCode = Math.floor(status / 100) * 100;
  const statusKey = `${statusCode}xx`;

  return httpStatusColors[statusKey]?.[mode] || httpStatusColors.default[mode];
};

// Responsive spacing utilities based on original design
export const spacing = {
  1: 'var(--spacing-1)',
  2: 'var(--spacing-2)',
  3: 'var(--spacing-3)',
  4: 'var(--spacing-4)',
  5: 'var(--spacing-5)',
  6: 'var(--spacing-6)',
  8: 'var(--spacing-8)',
  10: 'var(--spacing-10)',
  12: 'var(--spacing-12)',
  15: 'var(--spacing-15)',
  20: 'var(--spacing-20)',
};

// Typography utilities based on original design
export const typography = {
  xs: 'var(--font-size-xs)',
  sm: 'var(--font-size-sm)',
  base: 'var(--font-size-base)',
  md: 'var(--font-size-md)',
  lg: 'var(--font-size-lg)',
  xl: 'var(--font-size-xl)',
};

export default {
  lightTheme,
  darkTheme,
  getThemeColors,
  applyTheme,
  getCSSVariable,
  cn,
  statusColors,
  httpStatusColors,
  getHttpStatusColor,
  spacing,
  typography,
};