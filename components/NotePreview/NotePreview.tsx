'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api'; // Переконайтеся у правильному шляху
import type { Note } from '@/types/note'; // Переконайтеся у правильному шляху
import css from './NotePreview.module.css'; // Новий CSS для NotePreview

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
    refetchOnMount: false, // Не перезавантажувати при монтуванні, якщо дані вже в кеші
  });

  if (isNaN(id)) {
    return <p className={css.message}>Некоректний ID нотатки.</p>;
  }

  if (isLoading) {
    return <p className={css.loadingMessage}>Завантаження нотатки...</p>; // Простий індикатор завантаження
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

  // Логіка форматування дати, як ми її покращували раніше
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
