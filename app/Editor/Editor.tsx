"use client"

import * as S from "./Editor.styled";
import SplitPane, {Pane, SashContent} from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import React, {useEffect, useState} from "react";
import {Fade} from "@mui/material";
import {ListOfContents} from "@/app/Editor/ListOfContents/ListOfContents";
import {SectionTabs} from "@/app/Editor/SectionTabs/SectionTabs";
import {LessonHeader} from "@/app/Editor/LessonHeader/LessonHeader";
import {EditorSectionContext} from "@/app/context/EditorSectionContext";
import {EEditorSectionType} from "@/app/constants/editor";
import {ControlPanel} from "@/app/Editor/ControlPanel/ControlPanel";
import {SectionCode} from "@/app/Editor/Section/Code/SectionCode";
import {SectionLesson} from "@/app/Editor/Section/Lesson/SectionLesson";
import {BottomPanel} from "@/app/Editor/Panel/BottomPanel/BottomPanel";

export default function Editor() {

  const [showListOfContents, setShowListOfContents] = useState(true);
  const {currentSection} = React.useContext(EditorSectionContext);

  const [panelSizeHorizontal, setPanelSizeHorizontal] = useState(['400px', 'auto']);
  const [panelSizeVertical, setPanelSizeVertical] = useState(['auto', '250px']);

  useEffect(() => {
    setShowListOfContents(false);
  }, [currentSection]);

  const toggleListOfContents = () => {
    setShowListOfContents((prev) => !prev);
  };

  return (
    <>
      <SectionTabs></SectionTabs>
      <SplitPane
        split="vertical"
        sizes={panelSizeHorizontal}
        onChange={setPanelSizeHorizontal}
        sashRender={(_, active) => <SashContent active={active} type='vscode'/>}
      >
        {/*{(sizes: number[]) => setPanelSizeHorizontal(sizes.map((s) => s.toString()))}*/}
        <Pane minSize={50} maxSize='50%'>
          <S.Section>
            <LessonHeader handleClick={toggleListOfContents}/>
            <S.SectionContent>
              <Fade in={showListOfContents} timeout={500}>
                <S.OverlayBox><ListOfContents/></S.OverlayBox>
              </Fade>
              {currentSection === EEditorSectionType.LESSON && (
                <SectionLesson/>
              )}
              {currentSection === EEditorSectionType.TREE && (
                <>TREE</>
              )}
              {currentSection === EEditorSectionType.SHARE && (
                <>SHARE</>
              )}
            </S.SectionContent>
          </S.Section>
        </Pane>
        <S.RightPane>
          <SplitPane
            split="horizontal"
            sizes={panelSizeVertical}
            onChange={setPanelSizeVertical}
            sashRender={(_, active) => <SashContent active={active} type='vscode'/>}
          >
            {/*{(sizes: number[]) => setPanelSizeVertical(sizes.map((s) => s.toString()))}*/}
            <Pane>
              <S.Code>
                <SectionCode/>
                <ControlPanel/>
              </S.Code>
            </Pane>
            <BottomPanel />
          </SplitPane>
        </S.RightPane>
      </SplitPane>
    </>
  )
}
