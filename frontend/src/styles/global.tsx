import React from 'react';
import { Global, css } from '@emotion/react';

const style = css`
  html {
    font-size: 16px;
    background-color: #ffedcb;
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
`;

export default function GlobalStyle() {
  return <Global styles={style} />;
}
