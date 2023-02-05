/** @jsxImportSource @emotion/react */
import Footer from './Footer';

import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';


interface LayoutDefaultProps {
  children?: React.ReactElement;
}

export default function Layout({ children }: LayoutDefaultProps) {
  return (
    <div>
      <main css={css({ backgroundColor: '#ffffff' })}>{children || <Outlet />}</main>
      <Footer />
    </div>
  );
}
