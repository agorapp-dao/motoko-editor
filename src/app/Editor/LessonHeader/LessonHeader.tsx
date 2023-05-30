import * as S from './LessonHeader.styled';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';

type TProps = {
  handleClick: () => void;
  title: string;
};

// TODO - solve 'any'
const LessonButton = styled((props: any) => <Button {...props} />)(({ theme }) => ({
  textTransform: 'none',
}));

export const LessonHeader: React.FC<TProps> = ({ handleClick, title }) => {
  return (
    <S.Wrapper>
      <LessonButton variant="text" onClick={handleClick}>
        <S.ButtonContent>
          <FormatListBulletedIcon sx={{ fontSize: 30 }} />
          <span>{title}</span>
          <ExpandMoreIcon />
        </S.ButtonContent>
      </LessonButton>
    </S.Wrapper>
  );
};
