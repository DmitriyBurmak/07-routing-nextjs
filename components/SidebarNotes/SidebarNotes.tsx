'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { UITag } from '@/types/note';
import css from './SidebarNotes.module.css';

const allTags: UITag[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

const SidebarNotes: React.FC = () => {
  const pathname = usePathname();
  const currentTagInUrl = pathname.split('/').pop();
  const activeTag: UITag =
    currentTagInUrl &&
    allTags.some(tag => tag.toLowerCase() === currentTagInUrl.toLowerCase())
      ? (allTags.find(
          tag => tag.toLowerCase() === currentTagInUrl.toLowerCase()
        ) as UITag)
      : 'All';

  const getTagHref = (tag: UITag) => {
    return `/notes/filter/${tag === 'All' ? 'all' : tag}`;
  };

  return (
    <nav className={css.sidebar}>
      <h3 className={css.sidebarTitle}>Фільтр за тегами</h3>
      <ul className={css.menuList}>
        {allTags.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={getTagHref(tag)}
              className={`${css.menuLink} ${activeTag === tag ? css.active : ''}`}
            >
              {tag === 'All' ? 'Всі нотатки' : tag}{' '}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNotes;
