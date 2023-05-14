"use client"

import Editor from "@/app/Editor/Editor";
import {EditorSectionProvider} from "@/app/context/EditorSectionContext";
import {EditorSettingsProvider} from "@/app/context/EditorSettingsContext";
import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import {muiDarkTheme, theme} from "@/app/styles/themes";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "styled-components";
import * as S from "@/app/styles/global.styled";
import {EditorOutputProvider} from "@/app/context/EditorOutputContext";
import {EditorInstanceProvider} from "@/app/context/EditorInstanceContext";

function Home() {

  return (
    <EditorInstanceProvider>
      <EditorSectionProvider>
        <EditorSettingsProvider>
          <EditorOutputProvider>
            <MuiThemeProvider theme={muiDarkTheme}>
              <CssBaseline/>
              <ThemeProvider theme={theme}>
                <S.Main>
                  <Editor/>
                </S.Main>
              </ThemeProvider>
            </MuiThemeProvider>
          </EditorOutputProvider>
        </EditorSettingsProvider>
      </EditorSectionProvider>
    </EditorInstanceProvider>
  );
}

export default Home;
