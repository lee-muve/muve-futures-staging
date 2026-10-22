'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { DesktopNavLink } from '@/components/common/navbar/DesktopNavLink';
import { MobileNavMenu } from '@/components/common/navbar/MobileNavMenu';
import { PageId } from '@/app/types';
import { REFERRAL_HREF, type NavLinkConfig } from '@/constants';
import { cn } from '@/lib/utils';

const DROPDOWN_CLOSE_DELAY_MS = 180;

// The logo sits between these two groups on desktop (it doubles as the Home link). Each group is
// anchored 77 design units from the logo with 77 between items, and the search box is sized so the
// right side is as wide as the left, keeping the header symmetric.
const isLeft = (link: NavLinkConfig) => link.id === 'about' || link.id === 'services' || link.id === 'who-we-support';
const isRight = (link: NavLinkConfig) => link.id === 'resources' || link.id === 'contact';

interface NavbarProps {
  currentPage: PageId;
  onOpenSearch: () => void;
  /** Menu links; the Services and Who We Support dropdowns come from the CMS. */
  links: NavLinkConfig[];
}

export function Navbar({ currentPage, onOpenSearch, links }: NavbarProps) {
  const LEFT_NAV = links.filter(isLeft);
  const RIGHT_NAV = links.filter(isRight);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<PageId | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  // True once the full-size header has scrolled out of view.
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height = barRef.current?.offsetHeight ?? 0;
        setStuck(window.scrollY > Math.max(height - 40, 40));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Close any open dropdown on outside click.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const openDropdown = (id: PageId) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveDropdown(id);
  };

  const scheduleCloseDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => setActiveDropdown(null), DROPDOWN_CLOSE_DELAY_MS);
  };

  const closeMenus = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const renderDesktopLinks = (group: NavLinkConfig[], align: 'left' | 'right', compact = false) =>
    group.map((link) => (
      <DesktopNavLink
        key={link.id}
        link={link}
        align={align}
        isActive={currentPage === link.id}
        isOpen={activeDropdown === link.id}
        onOpen={() => openDropdown(link.id)}
        onScheduleClose={scheduleCloseDropdown}
        onNavigate={closeMenus}
        compact={compact}
      />
    ));

  return (
    // Mobile: a sticky bar. Desktop: the full-size header from the design frames
    // (305 design units, see app/globals.css) scrolls away, and a compact bar
    // slides down in its place so the navigation stays at the top.
    <header
      ref={headerRef}
      className={cn(
        'sticky top-0 z-40 w-full bg-brand-green text-white transition-shadow lg:static',
        stuck && 'shadow-lg lg:shadow-none'
      )}
    >
      <div ref={barRef} className="mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:relative lg:block lg:u-h-305 lg:u-w-1920 lg:px-0">
        <nav aria-label="Primary" className="hidden items-center lg:absolute lg:u-right-1177 lg:u-top-156 lg:flex lg:u-h-42 lg:u-gap-77">
          {renderDesktopLinks(LEFT_NAV, 'left')}
        </nav>

        <div className="flex flex-1 justify-start lg:absolute lg:u-left-820 lg:u-top-107">
          <Link href="/" onClick={closeMenus} aria-label="Muve Futures home">
            <Image
              src="/logo.svg"
              width={281}
              height={135}
              alt="Muve Futures"
              priority
              className="h-12 w-auto lg:h-auto lg:u-w-280"
            />
          </Link>
        </div>

        <div className="hidden items-center lg:absolute lg:u-left-1177 lg:u-top-156 lg:flex lg:u-h-42 lg:u-gap-77">
          <nav aria-label="Secondary" className="flex items-center lg:u-gap-77">
            {renderDesktopLinks(RIGHT_NAV, 'right')}
          </nav>

          <button
            type="button"
            id="btn-search"
            onClick={onOpenSearch}
            className="flex cursor-pointer items-center justify-between gap-2 rounded-full bg-white text-brand-navy transition hover:shadow-md lg:u-h-42 lg:u-w-199 lg:u-pl-24 lg:u-pr-18"
            aria-label="Search site"
            title="Search site"
          >
            <span className="font-bold leading-none lg:u-text-18" aria-hidden="true">
              …
            </span>
            <Search className="stroke-[3] lg:u-h-22 lg:u-w-22" />
          </button>
        </div>

        {/* Mobile action controls */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            type="button"
            id="btn-mobile-search"
            onClick={onOpenSearch}
            className="p-2 rounded-full border border-white/80 text-white hover:bg-white/15 transition cursor-pointer"
            aria-label="Open Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <Button asChild variant="orange" size="sm" className="h-8 px-3 text-xs">
            <Link id="btn-mobile-referral-quick" href={REFERRAL_HREF} onClick={closeMenus}>
              Referral
            </Link>
          </Button>

          <button
            type="button"
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="p-2 rounded-xl text-white hover:bg-white/15 transition cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-white"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && <MobileNavMenu currentPage={currentPage} links={links} onNavigate={closeMenus} />}

      {/* Compact desktop bar, shown once the full header has scrolled away */}
      <AnimatePresence>
        {stuck && (
          <motion.div
            key="compact-nav"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed inset-x-0 top-0 z-50 hidden bg-brand-green shadow-lg lg:block"
          >
            <div className="mx-auto grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-12 px-8 lg:u-gap-x-77">
              <nav aria-label="Primary (compact)" className="flex items-center justify-end gap-10 lg:u-gap-77">
                {renderDesktopLinks(LEFT_NAV, 'left', true)}
              </nav>
              <Link href="/" onClick={closeMenus} aria-label="Muve Futures home">
                <motion.span className="block" whileHover={{ rotate: -4, scale: 1.06 }}>
                  <Image src="/logo.svg" width={281} height={135} alt="Muve Futures" className="h-14 w-auto" />
                </motion.span>
              </Link>
              <div className="flex items-center gap-10">
                <nav aria-label="Secondary (compact)" className="flex items-center gap-10 lg:u-gap-77">
                  {renderDesktopLinks(RIGHT_NAV, 'right', true)}
                </nav>
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="flex h-8 w-24 lg:u-w-150 cursor-pointer items-center justify-between gap-1.5 rounded-full bg-white pr-2.5 pl-3.5 text-brand-navy transition hover:shadow-md"
                  aria-label="Search site"
                >
                  <span className="text-sm font-bold leading-none" aria-hidden="true">…</span>
                  <Search className="h-4 w-4 stroke-[3]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
