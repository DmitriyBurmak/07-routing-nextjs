import React from 'react';
import { notFound } from 'next/navigation';
import NotePreview from './NotePreview.client';

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

interface InterceptedNotePageProps {
  params: { id: string };
}

export default async function InterceptedNotePage({
  params,
}: InterceptedNotePageProps) {
  const noteId = Number(params.id);

  if (isNaN(noteId)) {
    notFound();
  }

  const queryClient = new QueryClient();
  const queryKey = ['note', noteId];

  try {
    await queryClient.prefetchQuery({
      queryKey: queryKey,
      queryFn: () => fetchNoteById(noteId),
    });
  } catch (error) {
    console.error('Error prefetching note data:', error);
    notFound();
  }

  const noteData = queryClient.getQueryData<Note>(queryKey);

  if (!noteData) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview note={noteData} />
    </HydrationBoundary>
  );
}
