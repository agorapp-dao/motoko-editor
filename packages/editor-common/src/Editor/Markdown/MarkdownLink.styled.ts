import styled from 'styled-components';
import Link from 'next/link';

export const HrefLink = styled(Link)`
  color: ${p => p.theme.link};

  &:hover {
    text-decoration: underline;
  }
`;
