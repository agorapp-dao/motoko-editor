import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

export const FullscreenControl = () => {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const newState = !fullscreen;
    setFullscreen(newState);
    if (newState) {
      document.body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const fullscreenchange = () => {
      if (!document.fullscreenElement) {
        setFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', fullscreenchange);
    return () => {
      document.removeEventListener('fullscreenchange', fullscreenchange);
    };
  }, []);

  return (
    <IconButton aria-label="fullscreen" onClick={toggleFullscreen}>
      {!fullscreen && <FullscreenIcon />}
      {fullscreen && <FullscreenExitIcon />}
    </IconButton>
  );
};
