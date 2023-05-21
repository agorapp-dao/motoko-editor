import { TLesson } from '@/app/types/education';

export const DEMO_COURSE: TLesson[] = [
  {
    name: 'Introduction',
    slug: 'introduction',
    content: [{ tab: 'Theory', markdown: '/01-introduction/theory.md' }],
    files: [{ path: '/01-introduction/main.mo', language: 'motoko' }],
  },
  {
    name: 'Basics',
    slug: 'basics',
    children: [
      {
        name: 'Printing values',
        slug: 'printing-values',
        content: [{ tab: 'Theory', markdown: '/02-print-values/theory.md' }],
        files: [{ path: '/02-print-values/main.mo', language: 'motoko' }],
        solution: { markdown: '/02-print-values/solution.md' },
      },
      {
        name: 'Variables',
        slug: 'variables',
        content: [{ tab: 'Theory', markdown: '/03-variables.md/theory.md' }],
        files: [{ path: '/03-variables/main.mo', language: 'motoko' }],
        solution: { markdown: '/03-variables/solution.md' },
      },
    ],
  },
  {
    name: 'Types',
    slug: 'types',
    content: [{ tab: 'Theory', markdown: '/markdown.md' }],
    children: [
      {
        name: 'Primitive types',
        slug: 'primitive-types',
        content: [{ tab: 'Theory', markdown: '/markdown.md' }],
      },
      {
        name: 'Unit type',
        slug: 'unit-type',
        content: [{ tab: 'Theory', markdown: '/markdown.md' }],
      },
    ],
  },
];
