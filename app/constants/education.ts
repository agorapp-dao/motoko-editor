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
      {
        name: 'Assigning values',
        slug: 'assigning-values',
      },
      {
        name: 'Operators',
        slug: 'operators',
      },
      {
        name: 'Text concatenation',
        slug: 'text-concatenation',
      },
      {
        name: 'Logical expressions',
        slug: 'logical-expressions',
      },
      {
        name: 'Functions',
        slug: 'functions',
      },
      {
        name: 'Ignore expressions',
        slug: 'ignore-expressions',
      },
    ],
  },
  {
    name: 'Types',
    slug: 'types',
    children: [
      {
        name: 'Primitive types',
        slug: 'primitive-types',
      },
      {
        name: 'Unit type',
        slug: 'unit-type',
      },
      {
        name: 'Type inference',
        slug: 'type-inference',
      },
      {
        name: 'Tuples',
        slug: 'tuples',
      },
      {
        name: 'Records',
        slug: 'records',
      },
      {
        name: 'Variants',
        slug: 'variants',
      },
      {
        name: 'Immutable arrays',
        slug: 'immutable-arrays',
      },
      {
        name: 'Mutable arrays',
        slug: 'mutable-arrays',
      },
      {
        name: 'Function types',
        slug: 'function-types',
      },
    ],
  },
  {
    name: 'Control flow',
    slug: 'control-flow',
    children: [
      {
        name: 'If',
        slug: 'if',
      },
      {
        name: 'Switch',
        slug: 'switch',
      },
      {
        name: 'For loop',
        slug: 'for-loop',
      },
      {
        name: 'While loop',
        slug: 'While loop',
      },
    ],
  },
  {
    name: 'Beyond basics',
    slug: 'beyond-basics',
    children: [
      {
        name: 'Objects',
        slug: 'objects',
      },
      {
        name: 'Classes',
        slug: 'classes',
      },
      {
        name: 'Options and results',
        slug: 'options-and-results',
      },
      {
        name: 'Pattern matching',
        slug: 'pattern-matching',
      },
      {
        name: 'Modules and imports',
        slug: 'modules-and-imports',
      },
      {
        name: 'Assertions',
        slug: 'assertions',
      },
    ],
  },
  {
    name: 'Actors',
    slug: 'actors',
    children: [
      {
        name: 'Defining actors',
        slug: 'defining-actors',
      },
      {
        name: 'Principals',
        slug: 'principals',
      },
      {
        name: 'Persistence',
        slug: 'persistence',
      },
    ],
  },
];
