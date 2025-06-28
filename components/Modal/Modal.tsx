'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css'; // Оновлений шлях до CSS

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode; // Тепер приймає будь-який вміст
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Відключаємо прокрутку body при відкритті модального вікна
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Відновлюємо прокрутку body при закритті модального вікна
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Закриваємо модалку, тільки якщо клік був саме по фону, а не по її вмісту
    if (e.currentTarget === e.target) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children} {/* Універсальний вміст модального вікна */}
      </div>
    </div>,
    document.body
  );
}
