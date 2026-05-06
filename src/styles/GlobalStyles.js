import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-blue: #004a99;
    --light-blue: #e3f2fd;
    --accent-blue: #2196f3;
    --white: #fff;
    --gray: #f5f5f5;
    --error-red: #ff4444;
    --success-green: #4caf50;
    --text-dark: #333;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--light-blue);
    color: var(--text-dark);
    line-height: 1.6;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    } to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    } to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(20px);
    } to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
