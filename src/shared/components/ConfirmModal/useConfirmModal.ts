import { useState } from 'react';

interface UseConfirmModalProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useConfirmModal = ({
  onConfirm,
  onCancel,
}: UseConfirmModalProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConfirm = () => {
    onConfirm?.();
    closeModal();
  };

  const handleCancel = () => {
    onCancel?.();
    closeModal();
  };

  return {
    isOpen,
    openModal,
    closeModal,
    handleConfirm,
    handleCancel,
  };
};
