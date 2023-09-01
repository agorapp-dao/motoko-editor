import { AppProps } from 'next/app';
import Script from 'next/script';
import React from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { GlobalStyle } from '@/src/styles/global.styled';
import { darkTheme, muiDarkTheme } from '@agorapp-dao/react-common';

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
        <ThemeProvider theme={darkTheme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </MuiThemeProvider>
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.REACT_APP_GA_TRACKING_CODE}');
          `,
        }}
        defer
      />
    </CacheProvider>
  );
};

export default MyApp;
