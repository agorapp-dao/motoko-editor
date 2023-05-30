import React, { useContext } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { EditorContext } from '@/src/app/context/EditorContext';

type TProps = {
  open: boolean;
  handleClose: () => void;
};

export const SettingsDialog: React.FC<TProps> = ({ open, handleClose }: TProps) => {
  const { fontSize, setFontSize } = useContext(EditorContext);

  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <br />
        <TextField
          label="Font size"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={fontSize}
          onChange={e => setFontSize(parseInt(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
