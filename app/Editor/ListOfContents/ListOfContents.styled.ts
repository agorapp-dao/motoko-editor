import styled from 'styled-components';
import Link from "next/link";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

export const Name = styled.div`
  
`;
