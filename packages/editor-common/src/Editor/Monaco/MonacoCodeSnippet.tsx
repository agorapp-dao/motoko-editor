import React, { useEffect, useRef } from 'react';
import * as S from './MonacoCodeSnippet.styled';
import { getMonaco } from './Monaco';
import { CopyToClipboard } from '../../components/CopyToClipboard/CopyToClibboard';

export interface MonacoCodeSnippetProps {
  code: string;
  language: string;
  inline?: boolean;
}

export const MonacoCodeSnippet = ({ code, language, inline }: MonacoCodeSnippetProps) => {
  const preEl = useRef<HTMLElement>(null);

  useEffect(() => {
    let isMounted = true;

    getMonaco().then(async monaco => {
      if (isMounted && preEl.current) {
        await monaco.editor.colorizeElement(preEl.current, { theme: 'editorTheme' });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [preEl]);

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
