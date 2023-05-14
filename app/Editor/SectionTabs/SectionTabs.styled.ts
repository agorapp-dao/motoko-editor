import styled from 'styled-components';


export const Wrapper = styled.div`
  border-right: ${p => p.theme.panelSeparator};
  width: 3rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Logo = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;  
  justify-items: center;
  text-align: center;
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export const Settings = styled.div`
  display: flex;
  justify-items: center;
  margin-bottom: 0.5rem;
  flex-direction: column;
`;
