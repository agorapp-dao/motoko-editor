import { useEffect, useState } from 'react';
import * as S from './Solution.styled';
import { Markdown } from '../Markdown/Markdown';
import { useEditorStore } from '../EditorStore';
import { AgButton } from '@agorapp-dao/react-common';

export interface SolutionProps {
  content: string;
}

export const Solution = ({ content }: SolutionProps) => {
  const [shown, setShown] = useState(false);
  const editorStore = useEditorStore();

  useEffect(() => {
    // reset solution state when lesson changes
    setShown(false);
  }, [editorStore.activeLessonSlug]);

  return (
    <S.Wrapper>
      <S.H2>Solution</S.H2>
      {!shown ? (
        <AgButton color="secondary" onClick={() => setShown(true)}>
          Show solution
        </AgButton>
      ) : (
        <>
          <Markdown>{content}</Markdown>
        </>
      )}
    </S.Wrapper>
  );
};
