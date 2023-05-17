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

export const CenteredText = styled.span`
  width: 100%;
  display: block;
  text-align: center;
  padding-top: 1rem;
  color: ${p => p.theme.intenseText};
`;
