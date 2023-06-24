import styled from 'styled-components';
import Link from 'next/link';

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

export const HrefLink = styled(Link)`
  color: ${p => p.theme.link};

  &:hover {
    text-decoration: underline;
  }
`;
