import styled from 'styled-components';

// TODO define color globally
export const Block = styled.div`
  display: block;
  position: relative;
  background: #24232e;
  border-radius: 5px;
  margin: 1rem 0;
  padding: 1rem;
`;

export const Inline = styled.code`
  position: relative;
  background: #24232e;
  border-radius: 5px;
  margin: 1rem 0;
  padding: 0.1rem 0.2rem;
`;

export const CopyToClipBoard = styled.span`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
`;
