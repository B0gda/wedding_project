import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { CircularText } from '@shared/react-bits/CircularText/CircularText';
import './AnchorNavigation.css';

export type NavigationItem = {
  href: string;
  label: string;
};

type AnchorNavigationProps = {
  items: readonly NavigationItem[];
  className?: string;
};

export function AnchorNavigation({ items, className }: AnchorNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={clsx('anchor-nav', isOpen && 'anchor-nav--open', className)}
      aria-label="Навигация по приглашению"
    >
      <CircularText text="06.10.2026*06.10.2026*" spinDuration={22} />
      <div className="anchor-nav__links" aria-hidden={!isOpen}>
        {items.map((item) => (
          <a
            className="anchor-nav__link"
            href={item.href}
            key={item.href}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
      <button
        className="anchor-nav__toggle"
        type="button"
        aria-label="Открыть навигацию"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
    </nav>
  );
}
