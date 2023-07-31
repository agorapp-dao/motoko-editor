import { SWRConfig } from 'swr';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { muiDarkTheme, theme } from '@/src/styles/themes';
import { CssBaseline } from '@mui/material';
import * as S from '@/src/styles/global.styled';
import { GlobalStyle } from '@/src/styles/global.styled';
import { Editor, editorService } from '@agorapp-dao/editor-common';
import { MotokoEditorPlugin } from '@agorapp-dao/editor-lang-motoko';

type TEditorPageProps = {
  lessonSlug: string;
  courseSlug: string;
  fallback: { [key: string]: any };
};

editorService.registerLanguagePlugin(new MotokoEditorPlugin());

export default function EditorPage({}: TEditorPageProps) {
  return (
    <SWRConfig>
      <MuiThemeProvider theme={muiDarkTheme}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <S.Main>
            <Editor />
          </S.Main>
        </ThemeProvider>
      </MuiThemeProvider>
    </SWRConfig>
  );
}
