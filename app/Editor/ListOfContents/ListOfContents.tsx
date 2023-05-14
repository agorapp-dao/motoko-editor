import * as S from './ListOfContents.styled';
import React from "react";

const Content = [
  {
    lesson: 1,
    name: 'Declare a Solidity Contract',
    done: true,
  },
  {
    lesson: 2,
    name: 'Lock a pragma version',
    done: true,
  },
  {
    lesson: 3,
    name: 'State Variables',
    done: true,
  },
  {
    lesson: 4,
    name: 'Read-only Functions',
    done: false,
  },
  {
    lesson: 5,
    name: 'State-changing Functions',
    done: false,
  },
];

export const ListOfContents = () => {

  return (
    <S.Wrapper>
      {Content.map((item) => (
        <S.ActiveLink href={`/lesson/${item.lesson}`} key={item.lesson}>
          <S.Row>
            <S.Number>{item.lesson}</S.Number>
            <strong>{item.name}</strong>
          </S.Row>
        </S.ActiveLink>
      ))}
    </S.Wrapper>
  );

};
