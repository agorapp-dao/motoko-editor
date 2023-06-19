'use client';

import * as S from './Editor.styled';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import React, { useEffect, useState } from 'react';
import { Fade } from '@mui/material';
import { SectionTabs } from '@/src/features/editor/components/Editor/SectionTabs/SectionTabs';
import { LessonHeader } from '@/src/features/editor/components/Editor/LessonHeader/LessonHeader';
import { EEditorSectionType } from '@/src/features/editor/constants/editor';
import { ControlPanel } from '@/src/features/editor/components/Editor/ControlPanel/ControlPanel';
import { SectionCode } from '@/src/features/editor/components/Editor/Section/Code/SectionCode';
import { SectionLesson } from '@/src/features/editor/components/Editor/Section/Lesson/SectionLesson';
import { BottomPanel } from '@/src/features/editor/components/Editor/Panel/BottomPanel/BottomPanel';
import { EditorContext } from '@/src/features/editor/context/EditorContext';
import { ContentLevel } from '@/src/features/editor/components/Editor/ContentItem/ContentLevel';
import { courseService } from '@/src/features/editor/services/courseService';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

export default function Editor() {
  const [showListOfContents, setShowListOfContents] = useState(true);
  const { currentSection, courseSlug, activeLessonSlug, setActiveLessonSlug, fullscreen } =
    React.useContext(EditorContext);

  const [panelSizeHorizontal, setPanelSizeHorizontal] = useState([500, Infinity]);
  const [panelSizeVertical, setPanelSizeVertical] = useState([Infinity, 250]);
  const course = courseService.useCourse(courseSlug);
  const handleFullscreen = useFullScreenHandle();

  useEffect(() => {
    fullscreen ? handleFullscreen.enter() : handleFullscreen.exit();
  }, [fullscreen]);

  useEffect(() => {
    setShowListOfContents(false);
  }, [currentSection]);

  const toggleListOfContents = () => {
    setShowListOfContents(prev => !prev);
  };

  const handleSelectLesson = (slug: string) => {
    setActiveLessonSlug(slug);
    if (course.data) {
      const lesson = courseService.findLessonBySlug(course.data, slug);
      if (lesson) {
        setActiveLessonSlug(lesson.slug);
      }
    }
    setShowListOfContents(false);
  };

  if (!course.data) {
    return <div></div>;
  }

  const activeLesson = courseService.findLessonBySlug(course.data, activeLessonSlug);

  return (
    <FullScreen handle={handleFullscreen} className="fullscreen">
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
            <S.SectionContent style={{ overflowY: showListOfContents ? 'hidden' : 'auto' }}>
              <Fade in={showListOfContents} timeout={500} style={{ overflowY: 'auto' }}>
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
    </FullScreen>
  );
}
