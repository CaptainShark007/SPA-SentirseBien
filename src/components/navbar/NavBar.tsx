import React from 'react';
import './NavBar.css';

const NavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav className='navbar'>{children}</nav>
    </>
  );
};

export default NavBar;
