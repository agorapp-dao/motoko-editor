import { TextField } from '@mui/material';
import GeneralDialog from '../../components/General/Dialog/GeneralDialog';
import { useEditorActions, useEditorFontSize } from '../EditorStore';

type TProps = {
  open: boolean;
  handleClose: () => void;
};

export const SettingsDialog: React.FC<TProps> = ({ open, handleClose }: TProps) => {
  const fontSize = useEditorFontSize();
  const actions = useEditorActions();

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
          onChange={e => actions.setFontSize(parseInt(e.target.value))}
        />
      </>
    </GeneralDialog>
  );
};
