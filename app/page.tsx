"use client"

import Editor from "@/app/Editor/Editor";
import {EditorSectionProvider} from "@/app/context/EditorSectionContext";
import {EditorSettingsProvider} from "@/app/context/EditorSettingsContext";
import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import {muiDarkTheme, theme} from "@/app/styles/themes";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "styled-components";
import * as S from "@/app/styles/global.styled";

function Home() {

  return (
    <EditorSectionProvider>
      <EditorSettingsProvider>
        <MuiThemeProvider theme={muiDarkTheme}>
          <CssBaseline/>
          <ThemeProvider theme={theme}>
            <S.Main>
              <Editor/>
            </S.Main>
          </ThemeProvider>
        </MuiThemeProvider>
      </EditorSettingsProvider>
    </EditorSectionProvider>
  );
}

export default Home;
