'use client';

import * as S from './Editor.styled';
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fade } from '@mui/material';
import { SectionTabs } from '@/app/Editor/SectionTabs/SectionTabs';
import { LessonHeader } from '@/app/Editor/LessonHeader/LessonHeader';
import { EEditorSectionType } from '@/app/constants/editor';
import { ControlPanel } from '@/app/Editor/ControlPanel/ControlPanel';
import { SectionCode } from '@/app/Editor/Section/Code/SectionCode';
import { SectionLesson } from '@/app/Editor/Section/Lesson/SectionLesson';
import { BottomPanel } from '@/app/Editor/Panel/BottomPanel/BottomPanel';
import { EditorContext } from '@/app/context/EditorContext';
import { DEMO_COURSE } from '@/app/constants/education';
import findLessonRecursively from '@/app/utils/findLesson';
import {ContentLevel} from "@/app/Editor/ContentItem/ContentLevel";
import { StorageService } from '../services/StorageService';
import { SectionStorage } from './Section/SectionStorage/SectionStorage';
import { SectionWallet } from './Section/SectionWallet/SectionWallet';
import { EChains } from '../types/education';

toast.configure();

const StorageUploadInfo = ({swarmUrl}: {swarmUrl: string}) => <a href={swarmUrl} target="blank" rel="noreferrer">File saved on swarm:  click here to check it</a>

export default function Editor() {
  const [showListOfContents, setShowListOfContents] = useState(true);
  const { instance, currentSection, setActiveLessonSlug, setActiveLesson, activeLesson, setWalletIdentity, walletIdentity, activeLessonSlug } =
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

  const handleSectionStorage = async() => {
    try {
      if(!instance) {
        // TODO: fire toast message notifying the user that nothing happened because no editor instance was recognized (or alternative text message)
        toast('Unrecognized IDE instance')
        return
      }
      if(!walletIdentity.address) {
        // todo: notify the user that they need to connect their wallet
        toast('Please connect your wallet first. Go to the wallet tab')
        return
      }
  
      // console.log('wallet-identity: ', walletIdentity)
      // console.log('activeLessonSlug ', activeLessonSlug)
  
      const swarmFileName = `${walletIdentity.address}-${activeLessonSlug}`
  
      const response = await StorageService.swarmUploadFile({
        file: JSON.stringify(instance.getValue()),
        fileName: swarmFileName,
      })
      toast.info(<StorageUploadInfo swarmUrl={response.swarmUrl} />)
    } catch(e) {
      toast('Something went wrong. Try to upload again.')
    }
  }

  const handleSectionWallet = async() => {
    try {
      if (!window) {
        console.log('no window');
        toast('Something went wrong.')
        return;
      }
      //@ts-ignore
      if (!window === typeof 'undefined' && !window.ic) {
        toast('Please install a supported ICP wallet (e.g.: plug)')
        return;
      }
      const publicKey = await window.ic.plug.requestConnect();
      setWalletIdentity({address: window.ic.plug.principalId, chain: EChains.ICP})
      toast(`Wallet connected: ${ window.ic.plug.principalId}`)
    } catch(e) {
      console.log(e)
      toast('Something went wrong.')
    }
  }

  return (
    <>
      <SectionTabs />
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
                    <ContentLevel
                      lessons={DEMO_COURSE}
                      level={1}
                      handleSelectLesson={handleSelectLesson}
                    />
                  </S.ListOfContents>
                </S.OverlayBox>
              </Fade>
              {currentSection === EEditorSectionType.LESSON && <SectionLesson />}
              {/*{currentSection === EEditorSectionType.TREE && <SectionTree />}*/}
              {currentSection === EEditorSectionType.SHARE && <SectionStorage handleSectionStorage={handleSectionStorage} />}
              {currentSection === EEditorSectionType.WALLET && <SectionWallet handleSectionWallet={handleSectionWallet} />}
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
