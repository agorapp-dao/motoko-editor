import * as S from './ControlPanel.styled';
import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { TLesson } from '@agorapp/content-common';
import { useRouter } from 'next/router';
import { EditorContext } from '../EditorContext';
import { courseService } from '../../services/courseService';
import { getLanguagePlugin } from '../Monaco/Monaco';

export const ControlPanel = () => {
  const router = useRouter();
  const { files, setOutput, courseSlug, activeLessonSlug } = useContext(EditorContext);
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
    if (!course.data) {
      return;
    }

    setRunning(true);
    try {
      const plugin = getLanguagePlugin(course.data.language);
      const output = await plugin.run(files);
      setOutput(output);
    } finally {
      setRunning(false);
    }
  };

  const handleGoToNext = () => {
    if (nextLesson) {
      router.push(`/editor/${course.data?.slug}/${nextLesson.slug}`);
    }
  };

  const handleGoToPrev = () => {
    if (prevLesson) {
      router.push(`/editor/${course.data?.slug}/${prevLesson.slug}`);
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
