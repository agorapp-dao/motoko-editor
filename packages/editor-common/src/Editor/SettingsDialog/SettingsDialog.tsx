import { TextField } from '@mui/material';
import GeneralDialog from '../../components/General/Dialog/GeneralDialog';
import { useEditorActions, useEditorStore } from '../EditorStore';

type TProps = {
  open: boolean;
  handleClose: () => void;
};

export const SettingsDialog: React.FC<TProps> = ({ open, handleClose }: TProps) => {
  const store = useEditorStore();
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
          value={store.fontSize}
          onChange={e => actions.setFontSize(parseInt(e.target.value))}
        />
      </>
    </GeneralDialog>
  );
};
