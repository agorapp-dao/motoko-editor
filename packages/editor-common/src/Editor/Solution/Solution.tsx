import { useContext, useEffect, useState } from 'react';
import * as S from './Solution.styled';
import { Button } from '@mui/material';
import { EditorContext } from '../EditorContext';
import { Markdown } from '../Markdown/Markdown';

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
