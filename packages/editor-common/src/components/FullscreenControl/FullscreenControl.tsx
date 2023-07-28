import { useCallback, useContext, useEffect } from 'react';
import { IconButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { EditorContext } from '../../Editor/EditorContext';

export const FullscreenControl = () => {
  const { fullscreen, setFullscreen } = useContext(EditorContext);

  const toggleFullscreen = useCallback(() => {
    const newState = !fullscreen;
    setFullscreen(newState);
    if (newState) {
      document.body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [fullscreen, setFullscreen]);

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
  }, [setFullscreen]);

  return (
    <IconButton aria-label="fullscreen" onClick={toggleFullscreen}>
      {!fullscreen && <FullscreenIcon />}
      {fullscreen && <FullscreenExitIcon />}
    </IconButton>
  );
};
