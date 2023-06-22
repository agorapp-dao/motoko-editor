import { createTheme } from '@mui/material';
import rgba from 'polished/lib/color/rgba';
import { monacoDefineTheme } from '@/src/features/editor/components/Editor/Monaco/Monaco';

const palette = {
  darkBg: '#191820',
  darkLighterBg: '#24232E',
  white: '#ffffff',
  intenseGray: '#3A384A',
  primary: '#00CB79',
  secondary: '#363445',
  text: '#a2a2a2',
};

export const theme = {
  background: palette.darkBg,
  panelSeparator: `1px solid ${palette.intenseGray}`,
  panelHoverBg: rgba(palette.primary, 0.32),
  intenseText: palette.white,
  linkHover: palette.primary,
  blockBg: palette.darkLighterBg,
  lessonLinkHover: rgba(palette.secondary, 0.7),
  link: palette.primary,
  scrollbar: palette.intenseGray,
  // TODO:
  mutedText: '#888',
  text: palette.text,
  sashHover: palette.primary,
};

export const muiDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      // https://m2.material.io/inline-tools/color/
      light: '#8fe1b2',
      main: palette.primary,
      dark: '#00b157',
      contrastText: '#fff',
    },
    secondary: {
      // https://m2.material.io/inline-tools/color/
      light: '#686578',
      main: palette.secondary,
      dark: '#161424',
      contrastText: '#fff',
    },
  },
  mixins: {
    toolbar: theme,
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h2: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    subtitle1: {
      fontSize: 20,
      color: theme.text,
    },
  },
});

monacoDefineTheme({
  base: 'vs-dark',
  inherit: true,
  // TODO polish color scheme
  rules: [
    { token: 'custom-info', foreground: 'a3a7a9', background: 'ffffff' },
    { token: 'custom-error', foreground: 'ee4444' },
    { token: 'custom-notice', foreground: '1055af' },
    { token: 'custom-date', foreground: '20aa20' },
  ],
  colors: {
    'editor.foreground': '#FFFFFF',
    'editor.background': theme.background,
  },
});
