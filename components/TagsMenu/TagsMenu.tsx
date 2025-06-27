'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { UITag } from '@/types/note';
import css from './TagsMenu.module.css';

const allTags: UITag[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

const TagsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentPathSegment = pathname.split('/').pop();
  const activeTag: UITag =
    currentPathSegment &&
    allTags.some(tag => tag.toLowerCase() === currentPathSegment.toLowerCase())
      ? (allTags.find(
          tag => tag.toLowerCase() === currentPathSegment.toLowerCase()
        ) as UITag)
      : 'All';

  const toggleMenu = () => setIsOpen(prev => !prev);

  const getTagHref = (tag: UITag) => {
    return `/notes/filter/${tag === 'All' ? 'all' : tag}`;
  };

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={toggleMenu}
        aria-expanded={isOpen}
      >
        {activeTag} ▾
      </button>
      {isOpen && (
        <ul className={css.menuList} onMouseLeave={() => setIsOpen(false)}>
          {' '}
          {allTags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={getTagHref(tag)}
                className={`${css.menuLink} ${activeTag === tag ? css.active : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
