import * as S from './ContentItem.styled';
import React, { useState } from 'react';
import { TLesson } from '@/src/app/types/education';
import { Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ContentLevel } from '@/src/app/Editor/ContentItem/ContentLevel';

interface TProps {
  item: TLesson;
  level: number;
  baseIndex?: string;
  handleSelectLesson: (slug: string) => void;
}

export const ContentItem: React.FC<TProps> = ({
  item,
  level,
  baseIndex,
  handleSelectLesson,
}: TProps) => {
  const [opened, setOpened] = useState(true);

  const handleClick = (lesson: TLesson) => {
    if (lesson.content) {
      handleSelectLesson(lesson.slug);
    } else if (lesson.children?.length) {
      setOpened(!opened);
    }
  };

  const noContent = !item.content && !item.children?.length;

  return (
    <>
      <S.ActiveLink onClick={() => handleClick(item)}>
        <S.Row $noContent={noContent}>
          <S.Number>{baseIndex}</S.Number>
          <S.Name level={level}>{item.name}</S.Name>
          {item.children?.length && (
            <ExpandMoreIcon
              style={{
                transition: 'all 0.3s ease',
                transform: `rotate(${opened ? 0 : '0.5turn'})`,
              }}
            />
          )}
        </S.Row>
      </S.ActiveLink>
      {item.children?.length && (
        <Collapse in={opened} timeout={300}>
          <div style={{ marginTop: '1rem' }}>
            <ContentLevel
              lessons={item.children}
              level={level + 1}
              baseIndex={baseIndex}
              handleSelectLesson={handleSelectLesson}
            />
          </div>
        </Collapse>
      )}
    </>
  );
};
