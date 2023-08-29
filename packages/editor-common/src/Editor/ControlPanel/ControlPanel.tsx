import * as S from './ControlPanel.styled';
import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { TLesson } from '@agorapp-dao/content-common';
import { useRouter } from 'next/router';
import { courseService } from '../../services/courseService';
import { editorService } from '../editorService';
import { useEditorActions, useEditorStore } from '../EditorStore';
import { useEditorPlugin } from '../Monaco/useEditorPlugin';
import { AgButton } from '@agorapp-dao/react-common/src/components/AgButton';
import { useMobile } from '../../hooks/useMobile';

interface IControlPanelProps {
  handleResetCode: () => void;
}

export const ControlPanel = ({ handleResetCode }: IControlPanelProps) => {
  const router = useRouter();
  const plugin = useEditorPlugin();
  const store = useEditorStore();
  const actions = useEditorActions();
  const [running, setRunning] = useState(false);
  const [nextLesson, setNextLesson] = useState<TLesson | undefined>(undefined);
  const [prevLesson, setPrevLesson] = useState<TLesson | undefined>(undefined);
  const course = courseService.useCourse();
  const { progress, invalidateProgress } = courseService.useCourseProgress();
  const { mobile } = useMobile();

  useEffect(() => {
    if (course.data && store.activeLessonSlug) {
      setNextLesson(courseService.nextLesson(course.data, store.activeLessonSlug));
      setPrevLesson(courseService.prevLesson(course.data, store.activeLessonSlug));
    }
  }, [store.activeLessonSlug, course]);

  const handleRunCode = async () => {
    if (!course.data) {
      return;
    }

    setRunning(true);
    try {
      for (const tab of store.tabs) {
        const file = store.files.find(f => f.path === tab.path);
        if (!file) {
          throw new Error(`File ${tab.path} not found`);
        }
        file.content = tab.model.getValue();
      }

      if (course.data.config.tests) {
        const res = await editorService.test(
          plugin!,
          store.courseSlug!,
          store.activeLessonSlug,
          store.files,
        );
        actions.setTestResults(res);
        if (res.passed && store.config.onLessonComplete) {
          await store.config.onLessonComplete('1.1');
        }
        invalidateProgress();
      } else {
        const output = await editorService.run(
          plugin!,
          store.courseSlug!,
          store.activeLessonSlug,
          store.files,
        );
        actions.setOutput(output);
      }
    } finally {
      setRunning(false);
    }
  };

  const handleGoToNext = () => {
    if (nextLesson && course.data) {
      router.push(courseService.getCoursePath(course.data.slug, nextLesson.slug));
      actions.setOutput('');
    }
  };

  const handleGoToPrev = () => {
    if (prevLesson && course.data) {
      router.push(courseService.getCoursePath(course.data.slug, prevLesson.slug));
      actions.setOutput('');
    }
  };

  const nextDisabled =
    !nextLesson ||
    running ||
    (progress[store.activeLessonSlug] &&
      progress[store.activeLessonSlug]?.status !== 'FINISHED' &&
      store.config.enableLessonsWithProgress);

  return (
    <S.Wrapper>
      <AgButton
        onClick={handleRunCode}
        startIcon={
          running ? <CircularProgress color="secondary" size={14} /> : <PlayArrowRoundedIcon />
        }
      >
        RUN
      </AgButton>
      <IconButton aria-label="reset" onClick={handleResetCode}>
        <DeleteOutlineRoundedIcon />
      </IconButton>
      <IconButton aria-label="back" onClick={handleGoToPrev} disabled={!prevLesson || running}>
        <NavigateBeforeRoundedIcon />
      </IconButton>
      <AgButton
        onClick={handleGoToNext}
        color={nextLesson && !nextDisabled ? 'primary' : 'secondary'}
        disabled={nextDisabled}
        endIcon={!mobile && <NavigateNextRoundedIcon />}
      >
        {!mobile && 'NEXT'}
        {mobile && <NavigateNextRoundedIcon />}
      </AgButton>
    </S.Wrapper>
  );
};
