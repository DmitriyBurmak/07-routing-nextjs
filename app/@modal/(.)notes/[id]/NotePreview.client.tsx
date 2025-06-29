'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  id: number;
}

const NotePreview: React.FC<NotePreviewProps> = ({ id }) => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note, Error, Note, ['note', number]>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !isNaN(id),
  });

  if (isNaN(id)) {
    return (
      <Modal onClose={handleClose}>
        <p className={css.message}>Некоректний ID нотатки.</p>
      </Modal>
    );
  }

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p className={css.loadingMessage}>Завантаження нотатки...</p>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal onClose={handleClose}>
        <p className={css.message}>
          Помилка при завантаженні: {error?.message || 'Невідома помилка'}
        </p>
      </Modal>
    );
  }

  if (!note) {
    return (
      <Modal onClose={handleClose}>
        <p className={css.message}>Нотатка не знайдена.</p>
      </Modal>
    );
  }

  const dateToFormat = note.updatedAt || note.createdAt;
  const formattedDate = new Date(dateToFormat).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const datePrefix = note.updatedAt ? 'Оновлено' : 'Створено';

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
          <span className={css.tag}>{note.tag}</span>
          <span className={css.date}>
            {datePrefix}: {formattedDate}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;
