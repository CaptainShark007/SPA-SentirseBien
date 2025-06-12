import styles from '@components/Containers/ContainerModal/ContainerModal.module.css';
import React, { useEffect } from 'react';

interface ContainerModalProps {
  children: React.ReactNode;
  onCloseModal: () => void;
}

const ContainerModal = ({ children, onCloseModal }: ContainerModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className={styles['modal-overlay']} onClick={() => onCloseModal()}>
      <div
        className={styles['modal-container']}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ContainerModal;
