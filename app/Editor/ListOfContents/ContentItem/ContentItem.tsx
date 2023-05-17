import * as S from './ContentItem.styled';
import React from "react";
import {TLesson} from "@/app/types/education";

interface TProps {
  lessons: TLesson[];
  level: number;
  baseIndex?: string;
};

export const ContentItem: React.FC<TProps> = ({lessons, level, baseIndex}: TProps) => {

  function createIndex(index: number, baseIndex?: string) {
    return (baseIndex ? `${baseIndex}.` : '') + index;
  }

  return (
    <S.Wrapper level={level}>
      {lessons.map((item, index) => (
        <div key={item.name}>

          <S.ActiveLink href={`/lesson`}>
            <S.Row>
              <S.Number>{createIndex(index + 1, baseIndex)}</S.Number>
              <S.Name level={level}>{item.name}</S.Name>
            </S.Row>
          </S.ActiveLink>

          {item.children?.length && (
            <div style={{marginTop: '1rem'}}>
              <ContentItem
                lessons={item.children}
                level={level + 1}
                baseIndex={createIndex(index + 1, baseIndex)}
              />
            </div>
          )}

        </div>
      ))}
    </S.Wrapper>
  );

};
