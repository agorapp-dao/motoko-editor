import styled from 'styled-components';

export const OverlayBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #22212c;
  z-index: 1;
  padding: 1.5rem;
`;

export const SectionContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
`;

export const Section = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: ${p => p.theme.panelSeparator};
`;

export const RightPane = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Code = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-bottom: ${p => p.theme.panelSeparator};
  overflow: hidden;
`;

export const ListOfContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
