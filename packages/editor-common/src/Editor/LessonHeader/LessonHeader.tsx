import * as S from './LessonHeader.styled';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, IconButton } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

type TProps = {
  handleClick: () => void;
  title: string;
  handleClose?: () => void;
};

// TODO - solve 'any'
const LessonButton = styled((props: any) => <Button {...props} />)(({ theme }) => ({
  textTransform: 'none',
}));

export const LessonHeader: React.FC<TProps> = ({ handleClick, title, handleClose }) => {
  return (
    <S.Wrapper>
      <LessonButton variant="text" onClick={handleClick}>
        <S.ButtonContent>
          <FormatListBulletedIcon sx={{ fontSize: 30 }} />
          <span>{title}</span>
          <ExpandMoreIcon />
        </S.ButtonContent>
      </LessonButton>
      {handleClose && (
        <S.IconWrapper>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </S.IconWrapper>
      )}
    </S.Wrapper>
  );
};
