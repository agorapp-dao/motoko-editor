'use client';

import * as S from './Editor.styled';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import React, { useEffect, useState } from 'react';
import { Fade } from '@mui/material';
import { SectionTabs } from '@/app/Editor/SectionTabs/SectionTabs';
import { LessonHeader } from '@/app/Editor/LessonHeader/LessonHeader';
import { EEditorSectionType } from '@/app/constants/editor';
import { ControlPanel } from '@/app/Editor/ControlPanel/ControlPanel';
import { SectionCode } from '@/app/Editor/Section/Code/SectionCode';
import { SectionLesson } from '@/app/Editor/Section/Lesson/SectionLesson';
import { BottomPanel } from '@/app/Editor/Panel/BottomPanel/BottomPanel';
import { EditorContext } from '@/app/context/EditorContext';
import { SectionTree } from '@/app/Editor/Section/Tree/SectionTree';
import { ContentItem } from '@/app/Editor/ContentItem/ContentItem';
import { DEMO_COURSE } from '@/app/constants/education';
import findLessonRecursively from '@/app/utils/findLesson';

export default function Editor() {
  const [showListOfContents, setShowListOfContents] = useState(true);
  const { currentSection, setActiveLessonSlug, setActiveLesson, activeLesson } =
    React.useContext(EditorContext);

  const [panelSizeHorizontal, setPanelSizeHorizontal] = useState([500, Infinity]);
  const [panelSizeVertical, setPanelSizeVertical] = useState([Infinity, 250]);

  useEffect(() => {
    setShowListOfContents(false);
  }, [currentSection]);

  const toggleListOfContents = () => {
    setShowListOfContents(prev => !prev);
  };

  const handleSelectLesson = (slug: string) => {
    setActiveLessonSlug(slug);
    const lesson = findLessonRecursively(DEMO_COURSE, slug);
    if (lesson) {
      setActiveLesson(lesson);
    }
    setShowListOfContents(false);
  };

  useEffect(() => {
    // TODO - load data on server side at first load
    handleSelectLesson('introduction');
  }, []);

  return (
    <>
      <SectionTabs></SectionTabs>
      <SplitPane
        split="vertical"
        sizes={panelSizeHorizontal}
        onChange={setPanelSizeHorizontal}
        sashRender={(_, active) => <SashContent active={active} type="vscode" />}
      >
        <Pane minSize={500} maxSize='50%'>
          <S.Section>
            {activeLesson && <LessonHeader title={activeLesson.name} handleClick={toggleListOfContents} />}
            <S.SectionContent>
              <Fade in={showListOfContents} timeout={500}>
                <S.OverlayBox>
                  <S.ListOfContents>
                    <ContentItem
                      lessons={DEMO_COURSE}
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
