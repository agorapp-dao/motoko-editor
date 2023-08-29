import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 1rem;
  background: ${p => p.theme.blockBg};
  //background: red;
  border-radius: 1.6rem;
  position: absolute;
  padding: 0.5rem;
  margin: 1rem;
  top: -75px;
`;
