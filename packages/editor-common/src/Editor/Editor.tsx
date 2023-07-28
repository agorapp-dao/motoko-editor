'use client';

import * as S from './Editor.styled';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import React, { useEffect, useRef, useState } from 'react';
import { Fade } from '@mui/material';
import { courseService } from '../services/courseService';
import { SectionTabs } from './SectionTabs/SectionTabs';
import { LessonHeader } from './LessonHeader/LessonHeader';
import { ContentLevel } from './ContentItem/ContentLevel';
import { EEditorSectionType } from '../constants';
import { SectionLesson } from './Section/Lesson/SectionLesson';
import { SectionCode } from './Section/Code/SectionCode';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { BottomPanel } from './Panel/BottomPanel/BottomPanel';
import { FeedbackBtn } from '../components/Feeback/FeedbackBtn';
import { useMonaco } from './Monaco/Monaco';
import { IEditorTab } from '../types/IEditorTab';
import { editorService } from './editorService';
import type { editor } from 'monaco-editor';
import { useMobile } from '../hooks/useMobile';
import {
  EditorStoreProvider,
  useEditorActions,
  useEditorActiveLessonSlug,
  useEditorActiveTab,
  useEditorCourseSlug,
  useEditorCurrentSection,
  useEditorTabs,
} from './EditorStore';

type EditorProps = {
  courseSlug: string;
  activeLessonSlug: string | undefined;
};

const THEORY_DEFAULT_WIDTH = 600;

export function Editor({ courseSlug, activeLessonSlug }: EditorProps) {
  return (
    <EditorStoreProvider courseSlug={courseSlug} activeLessonSlug={activeLessonSlug}>
      <EditorInner />
    </EditorStoreProvider>
  );
}

function EditorInner() {
  const monaco = useMonaco();
  const [showListOfContents, setShowListOfContents] = useState(true);
  const courseSlug = useEditorCourseSlug();
  const activeLessonSlug = useEditorActiveLessonSlug();
  const tabs = useEditorTabs();
  const activeTab = useEditorActiveTab();
  const currentSection = useEditorCurrentSection();
  const actions = useEditorActions();

  const { mobile } = useMobile();
  const [panelSizeHorizontal, setPanelSizeHorizontal] = useState([THEORY_DEFAULT_WIDTH, Infinity]);
  const [panelSizeVertical, setPanelSizeVertical] = useState([Infinity, 250]);
  const course = courseService.useCourse(courseSlug);
  const lessonSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowListOfContents(false);
  }, [currentSection]);

  useEffect(() => {
    if (mobile) {
      setPanelSizeHorizontal([0, Infinity]);
      actions.setCurrentSection(EEditorSectionType.CODE);
    } else {
      setPanelSizeHorizontal([THEORY_DEFAULT_WIDTH, Infinity]);
      actions.setCurrentSection(EEditorSectionType.LESSON);
    }
  }, [mobile, setPanelSizeHorizontal, actions]);

  const toggleListOfContents = () => {
    setShowListOfContents(prev => !prev);
  };

  const handleSelectLesson = (slug: string) => {
    setShowListOfContents(false);
  };

  useEffect(() => {
    let isMounted = true;
    let models: editor.ITextModel[] = [];

    const fetchFiles = async () => {
      if (!course.data || !activeLessonSlug || !monaco) {
        return;
      }

      const files = await courseService.getLessonFiles(course.data, activeLessonSlug);

      if (isMounted) {
        const tabs: IEditorTab[] = files.map(file => ({
          path: file.path,
          model: monaco.editor.createModel(
            file.content,
            editorService.getLanguageForFile(file.path),
            monaco.Uri.from({ scheme: 'inmemory', path: file.path }),
          ),
        }));
        actions.setFiles(files);
        actions.setTabs(tabs);
        models = tabs.map(tab => tab.model);
      }
    };

    fetchFiles();

    return () => {
      isMounted = false;
      models.forEach(model => model.dispose());
      actions.setTabs([]);
    };
  }, [course.data, activeLessonSlug, monaco, actions]);

  useEffect(() => {
    if (activeLessonSlug && lessonSectionRef.current) {
      lessonSectionRef.current?.scrollTo(0, 0);
    }
  }, [activeLessonSlug, lessonSectionRef]);

  const resetCode = async () => {
    if (!course.data || !activeLessonSlug || !monaco) {
      return;
    }
    const files = await courseService.getLessonFiles(course.data, activeLessonSlug);
    actions.setFiles(files);
    files.forEach(file => {
      tabs.find(tab => tab.path === file.path)?.model.setValue(file.content);
    });
  };

  if (!course.data) {
    return <div></div>;
  }

  const activeLesson = courseService.findLessonBySlug(course.data, activeLessonSlug);

  const theorySection = (
    <S.Section>
      {activeLesson && (
        <LessonHeader
          title={activeLesson.name}
          handleClick={toggleListOfContents}
          handleClose={
            mobile
              ? () => {
                  actions.setCurrentSection(EEditorSectionType.CODE);
                }
              : undefined
          }
        />
      )}
      <S.SectionContent ref={lessonSectionRef}>
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
        <div style={{ overflowY: showListOfContents ? 'hidden' : 'unset' }}>
          {currentSection === EEditorSectionType.LESSON && <SectionLesson />}
        </div>
      </S.SectionContent>
    </S.Section>
  );

  return (
    <>
      {courseSlug && activeLessonSlug && (
        <FeedbackBtn
          userCode={tabs[activeTab]?.model.getValue()}
          slug={`${courseSlug}/${activeLessonSlug}`}
        />
      )}
      <SectionTabs></SectionTabs>
      {mobile && currentSection !== EEditorSectionType.CODE && (
        <S.OverlaySection>{theorySection}</S.OverlaySection>
      )}
      <SplitPane
        split="vertical"
        sizes={panelSizeHorizontal}
        onChange={setPanelSizeHorizontal}
        sashRender={(_, active) => <SashContent active={active} type="vscode" />}
      >
        <Pane minSize={500} maxSize="50%">
          {!mobile && theorySection}
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
                <ControlPanel handleResetCode={resetCode} />
              </S.Code>
            </Pane>
            <BottomPanel />
          </SplitPane>
        </S.RightPane>
      </SplitPane>
    </>
  );
}
