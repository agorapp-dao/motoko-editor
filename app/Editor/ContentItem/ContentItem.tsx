import * as S from './ContentItem.styled';
import React, {useContext} from "react";
import {TLesson} from "@/app/types/education";
import {EditorContext} from "@/app/context/EditorContext";

interface TProps {
  lessons: TLesson[];
  level: number;
  baseIndex?: string;
  handleSelectLesson: (slug: string) => void;
};

export const ContentItem: React.FC<TProps> = ({lessons, level, baseIndex, handleSelectLesson}: TProps) => {

  function createIndex(index: number, baseIndex?: string) {
    return (baseIndex ? `${baseIndex}.` : '') + index;
  }

  return (
    <S.Wrapper level={level}>
      {lessons.map((item, index) => (
        <div key={item.name}>

          <S.ActiveLink onClick={() => handleSelectLesson(item.slug)}>
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
                handleSelectLesson={handleSelectLesson}
              />
            </div>
          )}

        </div>
      ))}
    </S.Wrapper>
  );

};
