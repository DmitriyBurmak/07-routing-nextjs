// app/notes/filter/layout.tsx
import React from 'react';
import css from './layout.module.css';

interface NotesFilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode; // <--- ДОДАНО: Слот для перехопленого маршруту @modal
}

export default function NotesFilterLayout({
  children,
  sidebar,
  modal, // <--- Отримуємо пропс modal
}: NotesFilterLayoutProps) {
  return (
    <>
      <div className={css.layoutContainer}>
        <aside className={css.sidebarWrapper}>
          {sidebar} {/* Рендеримо вміст паралельного маршруту @sidebar */}
        </aside>
        <main className={css.mainContent}>
          {children} {/* Рендеримо основний контент сторінки */}
        </main>
      </div>
      {modal} {/* <--- Рендеримо вміст перехопленого маршруту @modal */}
    </>
  );
}
