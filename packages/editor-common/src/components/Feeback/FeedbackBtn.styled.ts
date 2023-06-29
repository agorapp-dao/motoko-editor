import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 10rem;
  z-index: 10;
`;

export const Rotate = styled.div`
  position: relative;
  transform: rotate(-90deg);
  top: 0;
  right: 0;
`;

export const InnerWrapper = styled.div`
  opacity: 0.7;
  cursor: pointer;
  color: #fff;
  font-weight: 900;
  position: absolute;
  right: 0;
  top: -42px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 4px 6px;
  border: 1px solid #ffffff26;
  background: ${p => p.theme.blockBg};
`;
