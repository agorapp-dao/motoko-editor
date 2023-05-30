import { useContext, useEffect, useState } from 'react';
import { Markdown } from '@/src/features/editor/components/Editor/Markdown/Markdown';
import * as S from './Solution.styled';
import { Button } from '@mui/material';
import { EditorContext } from '@/src/features/editor/context/EditorContext';

export interface SolutionProps {
  content: string;
}

export const Solution = ({ content }: SolutionProps) => {
  const [shown, setShown] = useState(false);
  const { activeLessonSlug } = useContext(EditorContext);

  useEffect(() => {
    // reset solution state when lesson changes
    setShown(false);
  }, [activeLessonSlug]);

  return (
    <S.Wrapper>
      {!shown ? (
        <Button onClick={() => setShown(true)}>Show solution</Button>
      ) : (
        <>
          <h3>Solution</h3>
          <Markdown>{content}</Markdown>
        </>
      )}
    </S.Wrapper>
  );
};
