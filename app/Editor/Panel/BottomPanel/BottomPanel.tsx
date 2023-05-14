import {Pane} from "split-pane-react";
import React, {useContext, useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import {EditorOutputContext} from "@/app/context/EditorOutputContext";
import {SectionOutput} from "@/app/Editor/Section/SectionOutput/SectionOutput";
import * as S from "./BottomPanel.styled";

export const BottomPanel = () => {

  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([
    { name: 'Output' },
  ]);
  const {output} = useContext(EditorOutputContext);

  const changeActiveTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Pane>
      <Box sx={{width: '100%', flex: '1 1 auto'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={activeTab} onChange={changeActiveTab}>
            {tabs.map((tab, index) => (
              <Tab label={tab.name} key={index} value={index} />
            ))}
          </Tabs>
        </Box>
        <S.Content>
          <SectionOutput output={output} />
        </S.Content>
      </Box>
    </Pane>
  );
};
