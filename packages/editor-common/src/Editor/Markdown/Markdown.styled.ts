import styled, { css } from 'styled-components';
import { darken } from '@mui/material';

export const Wrapper = styled.div`
  ul {
    list-style: initial;
    padding-left: 40px;
    margin-top: 1rem;
  }

  li {
    margin-bottom: 0.2rem;
  }

  hr {
    margin: 16px 0;
    color: ${p => p.theme.secondary};
  }

  h3 {
    width: 100%;
    display: block;
    padding-top: 1rem;
    font-size: 1.1rem;
    color: ${p => p.theme.intenseText};
  }

  strong {
    color: ${p => darken(p.theme.intenseText, 0.2)};
  }
`;

interface IH2Props {
  $exercise?: boolean;
}

export const H2 = styled.h2<IH2Props>`
  width: 100%;
  display: block;
  padding-top: 1rem;
  font-size: 1.3rem;
  color: ${p => p.theme.intenseText};
  ${({ $exercise }) =>
    $exercise &&
    css`
      color: ${p => p.theme.primary};
      border-bottom: 1px solid #363445;
    `}
`;

export const P = styled.p`
  width: 100%;
  display: block;
  padding-top: 0;
  margin: 0;
  margin-bottom: 1rem;
`;
