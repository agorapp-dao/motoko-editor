import * as S from './ContentItem.styled';
import React from 'react';
import { TLesson } from '@agorapp-dao/content-common';
import { ContentItem } from './ContentItem';

interface TProps {
  lessons: TLesson[];
  level: number;
  baseIndex?: string;
  handleSelectLesson: (slug: string) => void;
}

export const ContentLevel: React.FC<TProps> = ({
  lessons,
  level,
  baseIndex,
  handleSelectLesson,
}: TProps) => {
  function createIndex(index: number, baseIndex?: string) {
    return (baseIndex ? `${baseIndex}.` : '') + index;
  }

  return (
    <S.Wrapper level={level}>
      {lessons.map((item, index) => (
        <div key={index}>
          <ContentItem
            item={item}
            level={level}
            baseIndex={createIndex(index + 1, baseIndex)}
            handleSelectLesson={handleSelectLesson}
          />
        </div>
      ))}
    </S.Wrapper>
  );
};
