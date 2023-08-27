import Modal from 'react-modal';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onOpen: () => void;
  children: React.ReactNode;
}
export default function ReusableModal({ isOpen, closeModal, onOpen, children }: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onOpen}
      onRequestClose={closeModal}
      appElement={document.getElementById('root') as HTMLElement}
      overlayClassName="fixed inset-0 flex justify-center items-center bg-black/50"
      className="min-w-[300px] max-w-[300px] m-auto bg-white rounded-xl shadow-xl p-4"
    >
      {children}
    </Modal>
  );
}
