'use client';

import * as S from './Editor.styled';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import React, { useContext, useEffect, useState } from 'react';
import { Fade } from '@mui/material';
import { SectionTabs } from '@/src/features/editor/components/Editor/SectionTabs/SectionTabs';
import { LessonHeader } from '@/src/features/editor/components/Editor/LessonHeader/LessonHeader';
import { EEditorSectionType } from '@/src/features/editor/constants/editor';
import { ControlPanel } from '@/src/features/editor/components/Editor/ControlPanel/ControlPanel';
import { SectionCode } from '@/src/features/editor/components/Editor/Section/Code/SectionCode';
import { SectionLesson } from '@/src/features/editor/components/Editor/Section/Lesson/SectionLesson';
import { BottomPanel } from '@/src/features/editor/components/Editor/Panel/BottomPanel/BottomPanel';
import { EditorContext } from '@/src/features/editor/context/EditorContext';
import findLessonRecursively from '@/src/utils/findLesson';
import { ContentLevel } from '@/src/features/editor/components/Editor/ContentItem/ContentLevel';
import { useJson } from '@/src/hooks/useJson';
import { TCourse } from '@/src/types/education';
import { useRouter } from 'next/router';

export default function Editor() {
  const [showListOfContents, setShowListOfContents] = useState(true);
  const { currentSection, activeLessonSlug, setActiveLessonSlug } = React.useContext(EditorContext);

  const [panelSizeHorizontal, setPanelSizeHorizontal] = useState([500, Infinity]);
  const [panelSizeVertical, setPanelSizeVertical] = useState([Infinity, 250]);
  const course = useJson<TCourse>('/api/course/motoko-tutorial');

  const router = useRouter();

  useEffect(() => {
    const lessonSlugs = router.query.lessonSlugs || ([] as string[]);
    setActiveLessonSlug(lessonSlugs[lessonSlugs.length - 1]);
  }, [router.query]);

  useEffect(() => {
    setShowListOfContents(false);
  }, [currentSection]);

  const toggleListOfContents = () => {
    setShowListOfContents(prev => !prev);
  };

  const handleSelectLesson = (slug: string) => {
    setActiveLessonSlug(slug);
    if (course.data) {
      const lesson = findLessonRecursively(course.data.lessons, slug);
      if (lesson) {
        setActiveLessonSlug(lesson.slug);
      }
    }
    setShowListOfContents(false);
  };

  if (!course.data) {
    return <div></div>;
  }

  const activeLesson = findLessonRecursively(course.data.lessons, activeLessonSlug || '');

  return (
    <>
      <SectionTabs></SectionTabs>
      <SplitPane
        split="vertical"
        sizes={panelSizeHorizontal}
        onChange={setPanelSizeHorizontal}
        sashRender={(_, active) => <SashContent active={active} type="vscode" />}
      >
        <Pane minSize={500} maxSize="50%">
          <S.Section>
            {activeLesson && (
              <LessonHeader title={activeLesson.name} handleClick={toggleListOfContents} />
            )}
            <S.SectionContent style={{ overflow: showListOfContents ? 'hidden' : 'scroll' }}>
              <Fade in={showListOfContents} timeout={500} style={{ overflow: 'scroll' }}>
                <S.OverlayBox>
                  <S.ListOfContents>
                    <ContentLevel
                      lessons={course.data.lessons}
                      level={1}
                      handleSelectLesson={handleSelectLesson}
                    />
                  </S.ListOfContents>
                </S.OverlayBox>
              </Fade>
              {currentSection === EEditorSectionType.LESSON && <SectionLesson />}
              {/*{currentSection === EEditorSectionType.TREE && <SectionTree />}*/}
              {currentSection === EEditorSectionType.SHARE && <>SHARE</>}
            </S.SectionContent>
          </S.Section>
        </Pane>
        <S.RightPane>
          <SplitPane
            split="horizontal"
            sizes={panelSizeVertical}
            onChange={setPanelSizeVertical}
            sashRender={(_, active) => <SashContent active={active} type="vscode" />}
          >
            <Pane>
              <S.Code>
                <SectionCode />
                <ControlPanel />
              </S.Code>
            </Pane>
            <BottomPanel />
          </SplitPane>
        </S.RightPane>
      </SplitPane>
    </>
  );
}
