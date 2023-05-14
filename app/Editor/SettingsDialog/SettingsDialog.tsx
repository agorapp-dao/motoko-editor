import * as S from './SettingsDialog.styled';
import React, {useContext} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {EditorSettingsContext} from "@/app/context/EditorSettingsContext";

type TProps = {
  open: boolean;
  handleClose: () => void;
};

export const SettingsDialog: React.FC<TProps> = ({open, handleClose}: TProps) => {
  const {fontSize, setFontSize} = useContext(EditorSettingsContext);



  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        Settings
      </DialogTitle>
      <DialogContent>
        <br />
          <TextField
            label="Font size"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
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
