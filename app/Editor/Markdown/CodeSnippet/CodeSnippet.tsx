import React from 'react';
import * as S from './CodeSnippet.styled';

type TProps = {
  code: string;
};

export const CodeSnippet: React.FC<TProps> = ({ code }: TProps) => {
  return (
    <S.Wrapper>
      {code}
    </S.Wrapper>
  );
};
