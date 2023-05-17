import styled from 'styled-components';
import Link from "next/link";

type TProps = {
  level: number;
};

export const Wrapper = styled.div<TProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: ${(p) => p.level * 0.3}rem;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(p) => p.theme.intenseText};
`;

export const ActiveLink = styled(Link)`

  strong {
    font-weight: 300;
  }
  
  :hover {
    strong {
      color: ${(p) => p.theme.linkHover};
    }
  }
  
`;

export const Number = styled.div`
  width: 2rem;
`;

export const Name = styled.div<TProps>`
  
`;
