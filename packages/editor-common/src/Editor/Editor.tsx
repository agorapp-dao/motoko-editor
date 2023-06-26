'use client';

import * as S from './Editor.styled';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import React, { useEffect, useState } from 'react';
import { Fade } from '@mui/material';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { EditorContext, EditorProvider } from './EditorContext';
import { courseService } from '../services/courseService';
import { SectionTabs } from './SectionTabs/SectionTabs';
import { LessonHeader } from './LessonHeader/LessonHeader';
import { ContentLevel } from './ContentItem/ContentLevel';
import { EEditorSectionType } from '../constants';
import { SectionLesson } from './Section/Lesson/SectionLesson';
import { SectionCode } from './Section/Code/SectionCode';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { BottomPanel } from './Panel/BottomPanel/BottomPanel';

type EditorProps = {
  courseSlug: string;
  activeLessonSlug: string | undefined;
  setActiveLessonSlug: (slug: string) => void;
};

export function Editor({ courseSlug, activeLessonSlug, setActiveLessonSlug }: EditorProps) {
  return (
    <EditorProvider
      courseSlug={courseSlug}
      activeLessonSlug={activeLessonSlug}
      setActiveLessonSlug={setActiveLessonSlug}
    >
      <EditorInner />
    </EditorProvider>
  );
}

function EditorInner() {
  const [showListOfContents, setShowListOfContents] = useState(true);
  const { currentSection, courseSlug, activeLessonSlug, setActiveLessonSlug, fullscreen } =
    React.useContext(EditorContext);

  const [panelSizeHorizontal, setPanelSizeHorizontal] = useState([600, Infinity]);
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
            <S.SectionContent>
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
              <div style={{ overflowY: showListOfContents ? 'hidden' : 'auto' }}>
                {currentSection === EEditorSectionType.LESSON && <SectionLesson />}
                {/*{currentSection === EEditorSectionType.TREE && <SectionTree />}*/}
                {currentSection === EEditorSectionType.SHARE && <>SHARE</>}
              </div>
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