import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  padding: 0.7rem 1rem;
  border-bottom: ${p => p.theme.panelSeparator};
`;

export const ButtonContent = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-items: center;
  font-size: 1.1rem;
  
  span {
    flex: auto;
  }
`;
