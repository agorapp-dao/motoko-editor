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
import nextLesson from '@/src/utils/nextLesson';
import { TLesson } from '@/src/types/education';
import { courseService } from '@/src/features/editor/services/courseService';

export const ControlPanel = () => {
  const { instance, setOutput, courseSlug, activeLessonSlug, setActiveLessonSlug } =
    useContext(EditorContext);
  const [running, setRunning] = useState(false);
  const [nextActive, setNextActive] = useState<TLesson | undefined>(undefined);
  const course = courseService.useCourse(courseSlug);

  useEffect(() => {
    // TODO - reject running code
    setNextActive(undefined);
  }, [activeLessonSlug]);

  const handleRunCode = async () => {
    if (!instance) {
      return;
    }

    setRunning(true);
    setNextActive(undefined);
    mo.clearPackages();
    mo.loadPackage(motokoBasePackage);
    mo.write('Main.mo', instance.getValue());
    const res = mo.run('Main.mo');

    setRunning(false);

    if (activeLessonSlug) {
      if (course.data) {
        const next = nextLesson(course.data.lessons, activeLessonSlug);
        setNextActive(next);
      }
    }
    setOutput(res.stdout + res.stderr);
  };

  const handleGoToNext = () => {
    if (nextActive) {
      setActiveLessonSlug(nextActive.slug);
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
      <IconButton aria-label="back">
        <NavigateBeforeRoundedIcon />
      </IconButton>
      <Button
        onClick={handleGoToNext}
        variant="contained"
        disabled={!nextActive}
        color={nextActive ? 'primary' : 'secondary'}
        endIcon={<NavigateNextRoundedIcon />}
        sx={{ borderRadius: '1.6rem' }}
      >
        NEXT
      </Button>
    </S.Wrapper>
  );
};
