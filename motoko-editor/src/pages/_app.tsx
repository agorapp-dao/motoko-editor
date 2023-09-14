import { AppProps } from 'next/app';
import Script from 'next/script';
import React from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { GlobalStyle } from '@/src/styles/global.styled';
import { makeTheme } from '@agorapp-dao/react-common';
import { EColorBrand, EColorMode } from '@agorapp-dao/react-common/src/types/misc';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
}

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, ...rest }: MyAppProps) => {
  const { pageProps } = rest;

  const theme = React.useMemo(
    () => createTheme(makeTheme(EColorMode.light, EColorBrand.motoko)),
    [],
  );

  return (
    <CacheProvider value={emotionCache}>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_TRACKING_CODE}`}
        defer
      />
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
      <MuiThemeProvider theme={theme}>
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
