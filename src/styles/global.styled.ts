import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body {
    max-width: 100vw;
    overflow: hidden;
    height: 100%;
    color: ${p => p.theme.text};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .split-sash-content.split-sash-content-vscode.split-sash-content-active {
    background-color: ${p => p.theme.sashHover} !important;
  }

  #__next {
    height: 100%;
  }

  /** Global definition of scrollbars */
  *::-webkit-scrollbar {
    width: 0.5rem;
  }

  *::-webkit-scrollbar-thumb {
    background: ${p => p.theme.scrollbar};
    border-radius: 5px;
  }

  *::-webkit-scrollbar-track {
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
  }

  *::-moz-scrollbar {
    width: 0.5rem;
  }

  *::-moz-scrollbar-thumb {
    background: ${p => p.theme.scrollbar};
    border-radius: 5px;
  }

  *::-moz-scrollbar-track {
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
  }
`;

export const Main = styled.main`
  background: ${p => p.theme.background};
  height: 100%;
  display: flex;
  flex-direction: row;
`;
