'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../../../../../../components/Modal/Modal';
import NotePreview from '../../../../../../components/NotePreview/NotePreview';

interface InterceptedNotePageProps {
  params: { id: string };
}

export default function InterceptedNotePage({
  params,
}: InterceptedNotePageProps) {
  const router = useRouter();
  const noteId = Number(params.id);

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <NotePreview id={noteId} />
    </Modal>
  );
}
