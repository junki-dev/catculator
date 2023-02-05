import { Global, css } from '@emotion/react';

const style = css`
  html {
    font-size: 16px;
    background-color: '#ffffff';
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  select,
  input,
  button,
  textarea {
    border: 0;
    outline: 0 !important;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default function GlobalStyle() {
  return <Global styles={style} />;
}
