import * as S from './ListOfContents.styled';
import React from "react";
import {DEMO_COURSE} from "@/app/constants/education";
import {ContentItem} from "@/app/Editor/ListOfContents/ContentItem/ContentItem";

export const ListOfContents = () => {

  return (
    <S.Wrapper>
      <ContentItem lessons={DEMO_COURSE} level={1} />
    </S.Wrapper>
  );

};
