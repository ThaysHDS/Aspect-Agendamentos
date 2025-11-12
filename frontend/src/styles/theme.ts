// src/styles/theme.ts
export const colors = {
  primary: "#2B7A78",        // botões, links, destaque
  secondary: "#3AAFA9",      // cards, ícones, bordas suaves
  background: "#DEF2F1",     // backgrounds e seções neutras
  text: "#17252A",           // texto principal
  base: "#FEFEFE",           // fundo base
  error: "#E63946",          // erros e exclusões
  highlight: "#F4C7C3",      // destaques e alertas neutros
};

export const fonts = {
  title: "'Poppins', sans-serif",
  body: "'Inter', sans-serif",
};

export const theme = {
  colors,
  fonts,
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
};

export default theme;
