import { useContext } from 'react';
import { IconButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { EditorContext } from '@/src/features/editor/context/EditorContext';

export const FullscreenControl = () => {
  const { fullscreen, setFullscreen } = useContext(EditorContext);

  return (
    <IconButton aria-label="fullscreen" onClick={() => setFullscreen(!fullscreen)}>
      {!fullscreen && <FullscreenIcon />}
      {fullscreen && <FullscreenExitIcon />}
    </IconButton>
  );
};
