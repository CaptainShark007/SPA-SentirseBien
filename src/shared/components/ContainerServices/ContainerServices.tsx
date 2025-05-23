import './containerServices.css';
import React from 'react';

interface ContainerServicesProps {
  title: string;
  children: React.ReactNode;
}

const ContainerServices = ({ title, children }: ContainerServicesProps) => {
  return (
    <section className='container'>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default ContainerServices;
