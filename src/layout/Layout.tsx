import Footer from '@layout/Footer/Footer';
import Header from '@layout/Header/Header';
import Navbar from '@layout/Nav/Navbar';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div style={{ minHeight: '90vh' }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
