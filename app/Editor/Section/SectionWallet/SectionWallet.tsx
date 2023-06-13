import React from 'react';
import { Button } from '@mui/material';


type TProps = {
    handleSectionWallet: () => Promise<void>;
  }

export const SectionWallet = ({handleSectionWallet }: TProps) => {
  return (
    <div style={{ margin: '1.5rem' }}>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={async () => await handleSectionWallet()}
      >
        connect to ICP
      </Button>

    </div>
  );
};
