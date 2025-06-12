import styles from '@components/Containers/ContainerServices/ContainerServices.module.css';
import React from 'react';

interface ContainerServicesProps {
  title: string;
  children: React.ReactNode;
}

const ContainerServices = ({ title, children }: ContainerServicesProps) => {
  return (
    <section className={styles['container-services']}>
      <h1>{title}</h1>
      {children}
    </section>
  );
};

export default ContainerServices;
