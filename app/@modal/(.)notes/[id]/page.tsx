import React from 'react';
import { notFound } from 'next/navigation';
import NotePreview from './NotePreview.client';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

interface InterceptedNotePageProps {
  params: Promise<{ id: string }>;
}

export default async function InterceptedNotePage({
  params,
}: InterceptedNotePageProps) {
  const { id } = await params;
  const noteId = Number(id);

  if (isNaN(noteId)) {
    notFound();
  }

  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={noteId} />
    </HydrationBoundary>
  );
}
