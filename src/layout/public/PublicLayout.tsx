import Footer from '@layout/public/Footer/Footer';
import Header from '@layout/public/Header/Header';
import Navbar from '@layout/public/Nav/Navbar';
import { Outlet } from 'react-router';

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
