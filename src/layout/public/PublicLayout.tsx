import Footer from '@layout/public/Footer/Footer';
import Header from '@layout/public/Header/Header';
import { Outlet } from 'react-router';

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
