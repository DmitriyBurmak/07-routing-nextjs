'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

interface ModalCloserProps {
  children: React.ReactNode;
}

const ModalCloser: React.FC<ModalCloserProps> = ({ children }) => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return <Modal onClose={handleClose}>{children}</Modal>;
};

export default ModalCloser;
