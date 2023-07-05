import React, { useEffect, useRef } from 'react';
import * as S from './MonacoCodeSnippet.styled';
import { useMonaco } from './Monaco';
import { CopyToClipboard } from '../../components/CopyToClipboard/CopyToClibboard';

export interface MonacoCodeSnippetProps {
  code: string;
  language: string;
  inline?: boolean;
}

export const MonacoCodeSnippet = ({ code, language, inline }: MonacoCodeSnippetProps) => {
  const monaco = useMonaco();
  const preEl = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!monaco || !preEl.current) {
      return;
    }

    monaco.editor.colorizeElement(preEl.current, { theme: 'editorTheme' });
  }, [preEl, monaco]);

  language = language || 'text';

  if (inline) {
    return (
      <S.Inline ref={preEl} data-lang={language}>
        {code}
      </S.Inline>
    );
  } else {
    return (
      <CopyToClipboard text={code}>
        <S.Block>
          <code ref={preEl} data-lang={language}>
            {code}
          </code>
        </S.Block>
      </CopyToClipboard>
    );
  }
};
