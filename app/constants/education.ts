import { TLesson } from '@/app/types/education';

export const DEMO_COURSE: TLesson[] = [
  {
    name: 'Introduction',
    slug: 'introduction',
    content: [{ tab: 'Theory', markdown: '/motoko-tutorial/01-introduction/theory.md' }],
    files: [{ path: '/motoko-tutorial/01-introduction/main.mo', language: 'motoko' }],
  },
  {
    name: 'Basics',
    slug: 'basics',
    children: [
      {
        name: 'Printing values',
        slug: 'printing-values',
        content: [{ tab: 'Theory', markdown: '/motoko-tutorial/02-basics/print-values/theory.md' }],
        files: [{ path: '/motoko-tutorial/02-basics/print-values/main.mo', language: 'motoko' }],
        solution: { markdown: '/motoko-tutorial/02-basics/print-values/solution.md' },
      },
      {
        name: 'Mutable variables',
        slug: 'mutable-variables',
        content: [
          { tab: 'Theory', markdown: '/motoko-tutorial/02-basics/mutable-variables/theory.md' },
        ],
        files: [
          { path: '/motoko-tutorial/02-basics/mutable-variables/main.mo', language: 'motoko' },
        ],
        solution: { markdown: '/motoko-tutorial/02-basics/mutable-variables/solution.md' },
      },
      {
        name: 'Immutable variables',
        slug: 'immutable-variables',
        content: [
          { tab: 'Theory', markdown: '/motoko-tutorial/02-basics/immutable-variables/theory.md' },
        ],
        files: [
          { path: '/motoko-tutorial/02-basics/immutable-variables/main.mo', language: 'motoko' },
        ],
        solution: { markdown: '/motoko-tutorial/02-basics/immutable-variables/solution.md' },
      },
    ],
  },
];
