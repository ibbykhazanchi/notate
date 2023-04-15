import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
    body {
        background: rgb(238,238,221);
        background: linear-gradient(180deg, rgba(238,238,221,1) 0%, rgba(238,238,255,1) 100%);
        background-attachment: fixed
    }
`;

export default GlobalStyle;