import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #20232a;
    --secondary: #6568f4;
    --hover-color: #61dafb;
    --background-primary: #ffffff;
    --background-secondary: #f3f4f6;
    --title-primary: #282c34;
    --text-primary: #000000;

    --nav-font-size: 24px;

  }
`;

export default GlobalStyles;