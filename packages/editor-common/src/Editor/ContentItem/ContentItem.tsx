import * as S from './ContentItem.styled';
import React, { useContext, useState } from 'react';
import { TLesson } from '@agorapp-dao/content-common';
import { Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import { ContentLevel } from './ContentLevel';
import { EditorContext } from '../EditorContext';
import { courseService } from '../../services/courseService';

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
  const { courseSlug } = useContext(EditorContext);
  const [opened, setOpened] = useState(true);
  const router = useRouter();

  const handleClick = (lesson: TLesson) => {
    if (lesson.content) {
      router.push(courseService.getCoursePath(courseSlug!, lesson.slug));
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
          <S.Number level={level}>{baseIndex}</S.Number>
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
