import { AppProps } from 'next/app';
import React from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
import { muiDarkTheme, theme } from '@/src/styles/themes';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { GlobalStyle } from '@/src/styles/global.styled';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
}

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, ...rest }: MyAppProps) => {
  const { pageProps } = rest;
  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={muiDarkTheme}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </MuiThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
