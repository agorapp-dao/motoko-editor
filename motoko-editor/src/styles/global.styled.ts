import styled, { createGlobalStyle } from 'styled-components';
import rgba from 'polished/lib/color/rgba';

export const GlobalStyle = createGlobalStyle`
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
  
  .fullscreen {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  #__next {
    height: 100%;
  }

  /** Global definition of scrollbars */
  *::-webkit-scrollbar {
    width: 0.75rem;
    height: 0.75rem;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: ${p => rgba(p.theme.scrollbar, 0.5)};
    border-radius: 5px;
    border: 3px solid transparent;
    background-clip: content-box;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: ${p => p.theme.scrollbar};
    border-radius: 5px;
    border: 3px solid transparent;
    background-clip: content-box;
  }

  *::-webkit-scrollbar-track {
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
  }

  *::-moz-scrollbar {
    width: 0.75rem;
  }

  *::-moz-scrollbar-thumb {
    background: ${p => rgba(p.theme.scrollbar, 0.5)};
    border-radius: 5px;
    border: 3px solid transparent;
    background-clip: content-box;
  }

  *::-moz-scrollbar-thumb:hover {
    background: ${p => p.theme.scrollbar};
    border-radius: 5px;
    border: 3px solid transparent;
    background-clip: content-box;
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
