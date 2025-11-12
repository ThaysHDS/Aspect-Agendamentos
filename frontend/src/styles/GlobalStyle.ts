// src/styles/global.ts
import { createGlobalStyle } from "styled-components";
import { colors, fonts } from "./theme";

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: ${colors.primary};
    --color-secondary: ${colors.secondary};
    --color-background: ${colors.background};
    --color-text: ${colors.text};
    --color-white: ${colors.base};
    --color-error: ${colors.error};
    --color-highlight: ${colors.highlight};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${fonts.body};
    background-color: var(--color-white);
    color: var(--color-text);
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${fonts.title};
    color: var(--color-primary);
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;



