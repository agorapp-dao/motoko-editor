import * as S from './ControlPanel.styled';
import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import mo from 'motoko/lib/versions/interpreter';
import motokoBasePackage from 'motoko/packages/latest/base.json';
import { EditorContext } from '@/src/features/editor/context/EditorContext';
import { TLesson } from '@/src/types/education';
import { courseService } from '@/src/features/editor/services/courseService';

export const ControlPanel = () => {
  const { instance, setOutput, courseSlug, activeLessonSlug, setActiveLessonSlug } =
    useContext(EditorContext);
  const [running, setRunning] = useState(false);
  const [nextLesson, setNextLesson] = useState<TLesson | undefined>(undefined);
  const [prevLesson, setPrevLesson] = useState<TLesson | undefined>(undefined);
  const course = courseService.useCourse(courseSlug);

  useEffect(() => {
    if (course.data && activeLessonSlug) {
      setNextLesson(courseService.nextLesson(course.data, activeLessonSlug));
      setPrevLesson(courseService.prevLesson(course.data, activeLessonSlug));
    }
  }, [activeLessonSlug, course]);

  const handleRunCode = async () => {
    if (!instance) {
      return;
    }

    setRunning(true);
    mo.clearPackages();
    mo.loadPackage(motokoBasePackage);
    mo.write('Main.mo', instance.getValue());
    const res = mo.run('Main.mo');

    setRunning(false);

    setOutput(res.stdout + res.stderr);
  };

  const handleGoToNext = () => {
    if (nextLesson) {
      setActiveLessonSlug(nextLesson.slug);
    }
  };

  const handleGoToPrev = () => {
    if (prevLesson) {
      setActiveLessonSlug(prevLesson.slug);
    }
  };

  return (
    <S.Wrapper>
      <Button
        onClick={handleRunCode}
        variant="contained"
        startIcon={
          running ? <CircularProgress color="secondary" size={14} /> : <PlayArrowRoundedIcon />
        }
        sx={{ borderRadius: '1.6rem' }}
      >
        RUN
      </Button>
      <IconButton aria-label="delete">
        <DeleteOutlineRoundedIcon />
      </IconButton>
      <IconButton aria-label="back" onClick={handleGoToPrev} disabled={!prevLesson || running}>
        <NavigateBeforeRoundedIcon />
      </IconButton>
      <Button
        onClick={handleGoToNext}
        variant="contained"
        disabled={!nextLesson || running}
        color={nextLesson ? 'primary' : 'secondary'}
        endIcon={<NavigateNextRoundedIcon />}
        sx={{ borderRadius: '1.6rem' }}
      >
        NEXT
      </Button>
    </S.Wrapper>
  );
};
