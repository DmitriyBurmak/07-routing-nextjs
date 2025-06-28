'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';
interface NotePreviewProps {
  id: number;
}

const NotePreview: React.FC<NotePreviewProps> = ({ id }) => {
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note, Error, Note, ['note', number]>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !isNaN(id),
    refetchOnMount: false,
  });

  if (isNaN(id)) {
    return <p className={css.message}>Некоректний ID нотатки.</p>;
  }

  if (isLoading) {
    return <p className={css.loadingMessage}>Завантаження нотатки...</p>;
  }

  if (isError) {
    return (
      <p className={css.message}>
        Помилка при завантаженні: {error?.message || 'Невідома помилка'}
      </p>
    );
  }

  if (!note) {
    return <p className={css.message}>Нотатка не знайдена.</p>;
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
  );
};

export default NotePreview;
