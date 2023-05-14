import * as S from './LessonHeader.styled';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Button} from "@mui/material";
import React from "react";

type TProps = {
  handleClick: () => void;
};

export const LessonHeader: React.FC<TProps> = ({handleClick}) => {
  return (
    <S.Wrapper>
      <Button variant="text" onClick={handleClick}>
        <S.ButtonContent>
          <FormatListBulletedIcon sx={{ fontSize: 30 }} />
          <span>Transaction assets</span>
          <ExpandMoreIcon />
        </S.ButtonContent>
      </Button>
    </S.Wrapper>
  );

};
