'use client';

import { useEffect } from 'react';
import { Reveal } from '@/components/motion/Reveal';

/*
 * MyNewTerm's vacancies widget, installed the way their "API Code" page
 * describes (Part B is the container, Part C loads their script and calls
 * mntSchoolVacancies), adapted to client-side navigation: the script is
 * loaded once per visit and the widget re-drawn whenever this mounts.
 * Brand colours for it are in app/globals.css ("MyNewTerm widget").
 */

const SCRIPT = 'https://api.mynewterm.com/assets/v1/dist/js/school_vacancies.js';

declare global {
  interface Window {
    mntSchoolVacancies?: (apiKey: string, responsive: number) => void;
  }
}

let scriptLoading: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (window.mntSchoolVacancies) return Promise.resolve();
  scriptLoading ??= new Promise<void>((resolve, reject) => {
    const tag = document.createElement('script');
    tag.src = SCRIPT;
    tag.async = true;
    tag.onload = () => resolve();
    tag.onerror = () => {
      scriptLoading = null; // let a later visit try again
      reject(new Error('The MyNewTerm script could not be loaded.'));
    };
    document.body.appendChild(tag);
  });
  return scriptLoading;
}

export function MyNewTermJobs({
  apiKey,
  title,
  intro,
  headingLevel = 'h2',
}: {
  apiKey: string;
  title: string;
  intro: string;
  /** h1 when it's the only careers list on /careers. */
  headingLevel?: 'h1' | 'h2';
}) {
  const Heading = headingLevel;
  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then(() => {
        if (!cancelled) window.mntSchoolVacancies?.(apiKey, 1);
      })
      .catch((error) => console.error(error));
    return () => {
      cancelled = true;
    };
  }, [apiKey]);

  return (
    <section aria-labelledby="mnt-vacancies-heading" className="relative z-20 mx-auto mt-16 w-[90%] lg:u-mt-110 lg:u-w-1202">
      <Reveal className="text-center text-white">
        <Heading id="mnt-vacancies-heading" className="text-3xl font-bold tracking-tight sm:text-5xl lg:u-text-73">
          {title}
        </Heading>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-lg lg:u-mt-20 lg:u-max-w-900 lg:u-text-22">{intro}</p>
      </Reveal>
      <div className="mt-8 rounded-[2rem] bg-white p-4 text-brand-ink sm:p-6 lg:u-mt-50 lg:u-rounded-60 lg:u-p-42">
        {/* Part B: MyNewTerm fills this. Don't change the id. */}
        <div id="mnt-parent-container" className="mnt-widget min-h-40" suppressHydrationWarning />
      </div>
    </section>
  );
}
