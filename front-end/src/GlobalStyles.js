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

    --error-color: #e85e6c;
    --nav-font-size: 20px;
    --form-font-size: 20px;

  }

  .incomplete,
  .hard,
  .error {
    color:  #e85e6c;
  }

  .passed,
  .easy,
  .success {
    color: #4CAF55;
  }

  .failed,
  .medium,
  .warning {
    color: #ffcc00;
  }

`;

export default GlobalStyles;