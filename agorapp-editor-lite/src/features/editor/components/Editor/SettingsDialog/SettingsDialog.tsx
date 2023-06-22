import React, { useContext } from 'react';
import { TextField } from '@mui/material';
import { EditorContext } from '@/src/features/editor/context/EditorContext';
import GeneralDialog from '@/src/components/General/Dialog/GeneralDialog';

type TProps = {
  open: boolean;
  handleClose: () => void;
};

export const SettingsDialog: React.FC<TProps> = ({ open, handleClose }: TProps) => {
  const { fontSize, setFontSize } = useContext(EditorContext);

  return (
    <GeneralDialog
      size="small"
      open={open}
      showConfirm={false}
      showClose={true}
      onClose={handleClose}
      cancelLabel="Close"
      title="Settings"
    >
      <>
        <TextField
          label="Font size"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={fontSize}
          onChange={e => setFontSize(parseInt(e.target.value))}
        />
      </>
    </GeneralDialog>
  );
};
