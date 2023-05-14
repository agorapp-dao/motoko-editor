import React, {useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lesson-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{padding: '1rem 0'}}>{children}</div>
      )}
    </div>
  );
}

export const SectionLesson = () => {

  const [lessonTab, setLessonTab] = useState(0);

  const changeTab = (event: React.SyntheticEvent, newValue: number) => {
    setLessonTab(newValue);
  };

  return (
    <div style={{margin: '1.5rem'}}>
      <Box sx={{width: '100%', flex: '1 1 auto'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={lessonTab} onChange={changeTab} centered>
            <Tab label="Theory"/>
            <Tab label="Exercise"/>
          </Tabs>
        </Box>
        <TabPanel value={lessonTab} index={0}>
          <p>On the Internet Computer, programs communicate with each other by sending asynchronous
            messages.
            Motoko makes asynchronous programming easy with the async..await syntax you might be familiar
            with from other languages.
            To define the asynchronous function, add the async keyword to the function return type:</p>

          <div style={{background: '#24232E', borderRadius: '5px', margin: '1rem 0', padding: '1rem'}}>
            func getBalance() : async Nat ()
          </div>
        </TabPanel>
        <TabPanel value={lessonTab} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </div>
  );

};
