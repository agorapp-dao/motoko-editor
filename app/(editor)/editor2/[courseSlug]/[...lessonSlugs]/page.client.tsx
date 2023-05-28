'use client';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { muiDarkTheme, theme } from '@/app/styles/themes';
import { useContext } from 'react';
import { EditorContext } from '@/app/context/EditorContext';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import * as S from '@/app/styles/global.styled';
import Editor from '@/app/Editor/Editor';

export function EditorPageClient() {
  const { course } = useContext(EditorContext);

  return (
    <MuiThemeProvider theme={muiDarkTheme}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <S.Main>
          <Editor />
        </S.Main>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}
