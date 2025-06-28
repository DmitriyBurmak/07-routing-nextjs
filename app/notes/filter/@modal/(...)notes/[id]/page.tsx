'use client'; // Цей компонент має бути клієнтським

import React from 'react';
import { useRouter } from 'next/navigation'; // Для навігації назад
import Modal from '../../../../../../components/Modal/Modal';
import NotePreview from '../../../../../../components/NotePreview/NotePreview'; // Компонент для відображення деталей нотатки

interface InterceptedNotePageProps {
  params: { id: string }; // params тут буде об'єктом, а не Promise, бо це клієнтський компонент
}

export default function InterceptedNotePage({
  params,
}: InterceptedNotePageProps) {
  const router = useRouter();
  const noteId = Number(params.id);

  const handleClose = () => {
    router.back(); // Повернення на попередній маршрут
  };

  // Тут НЕ потрібно prefetchQuery, оскільки це клієнтський компонент
  // і prefetchQuery вже відбувся на сервері (у app/notes/[id]/page.tsx),
  // а Modal та NotePreview будуть запущені після гідрації, використовуючи кеш.

  return (
    <Modal onClose={handleClose}>
      <NotePreview id={noteId} />
    </Modal>
  );
}
