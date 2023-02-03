import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';

interface LayoutDefaultProps {
  children?: React.ReactElement;
}

export default function Layout({ children }: LayoutDefaultProps) {
  return (
    <div>
      <Header />
      <main>{children || <Outlet />}</main>
      <Footer />
    </div>
  );
}
