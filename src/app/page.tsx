'use client';

import Editor from '@/src/app/Editor/Editor';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { muiDarkTheme, theme } from '@/src/app/styles/themes';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import * as S from '@/src/app/styles/global.styled';
import { EditorProvider } from '@/src/app/context/EditorContext';

function Home() {
  return (
    <EditorProvider>
      <MuiThemeProvider theme={muiDarkTheme}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <S.Main>
            <Editor />
          </S.Main>
        </ThemeProvider>
      </MuiThemeProvider>
    </EditorProvider>
  );
}

export default Home;
