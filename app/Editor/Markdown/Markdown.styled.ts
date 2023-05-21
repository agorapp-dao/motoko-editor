import styled from 'styled-components';


export const Wrapper = styled.div`
  ul {
    list-style: initial;
    padding-left: 40px;
    font-weight: 300;
    margin-bottom: 16px;
  }

  hr {
    margin: 16px 0;
    color: ${(p) => p.theme.secondary};
  }
`;

export const H2 = styled.h2`
  width: 100%;
  display: block;
  padding-top: 1rem;
  font-size: 1.3rem;
  color: ${p => p.theme.intenseText};
`;

export const P = styled.p`
  width: 100%;
  display: block;
  padding-top: 1rem;
`;
