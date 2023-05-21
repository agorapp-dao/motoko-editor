import { useState } from 'react';
import { Markdown } from '@/app/Editor/Markdown/Markdown';
import * as S from './Solution.styled';
import { Button } from '@mui/material';

export interface SolutionProps {
  content: string;
}

export const Solution = ({ content }: SolutionProps) => {
  const [shown, setShown] = useState(false);

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
