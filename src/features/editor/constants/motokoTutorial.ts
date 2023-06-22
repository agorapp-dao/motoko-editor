import { TCourse } from '@/src/types/education';

export const MOTOKO_TUTORIAL_COURSE: TCourse = {
  name: 'Motoko Tutorial',
  slug: 'motoko-tutorial',
  lessons: [
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
          content: [
            { tab: 'Theory', markdown: '/motoko-tutorial/02-basics/print-values/theory.md' },
          ],
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
          content: [
            { tab: 'Theory', markdown: '/motoko-tutorial/02-basics/assigning-values/theory.md' },
          ],
          files: [
            { path: '/motoko-tutorial/02-basics/assigning-values/main.mo', language: 'motoko' },
          ],
          solution: { markdown: '/motoko-tutorial/02-basics/assigning-values/solution.md' },
        },
        {
          name: 'Arithmetic operators',
          slug: 'arithmetic-operators',
          content: [
            {
              tab: 'Theory',
              markdown: '/motoko-tutorial/02-basics/arithmetic-operators/theory.md',
            },
          ],
          files: [
            { path: '/motoko-tutorial/02-basics/arithmetic-operators/main.mo', language: 'motoko' },
          ],
          solution: { markdown: '/motoko-tutorial/02-basics/arithmetic-operators/solution.md' },
        },
        {
          name: 'Logical expressions',
          slug: 'logical-expressions',
          content: [
            { tab: 'Theory', markdown: '/motoko-tutorial/02-basics/logical-expressions/theory.md' },
          ],
          files: [
            { path: '/motoko-tutorial/02-basics/logical-expressions/main.mo', language: 'motoko' },
          ],
          solution: { markdown: '/motoko-tutorial/02-basics/logical-expressions/solution.md' },
        },
        {
          name: 'Expressions',
          slug: 'expressions',
          content: [
            {
              tab: 'Theory',
              markdown: '/motoko-tutorial/02-basics/expressions/theory.md',
            },
          ],
          files: [
            {
              path: '/motoko-tutorial/02-basics/expressions/main.mo',
              language: 'motoko',
            },
          ],
          solution: {
            markdown: '/motoko-tutorial/02-basics/expressions/solution.md',
          },
        },
        {
          name: 'Functions',
          slug: 'functions',
          content: [{ tab: 'Theory', markdown: '/motoko-tutorial/02-basics/functions/theory.md' }],
          files: [{ path: '/motoko-tutorial/02-basics/functions/main.mo', language: 'motoko' }],
          solution: { markdown: '/motoko-tutorial/02-basics/functions/solution.md' },
        },
      ],
    },
    {
      name: 'Types',
      slug: 'types',
      children: [
        {
          name: 'Type annotations',
          slug: 'type-annotations',
          content: [
            { tab: 'Theory', markdown: '/motoko-tutorial/03-types/type-annotations/theory.md' },
          ],
          files: [
            { path: '/motoko-tutorial/03-types/type-annotations/main.mo', language: 'motoko' },
          ],
          solution: { markdown: '/motoko-tutorial/03-types/type-annotations/solution.md' },
        },
        {
          name: 'Primitive types',
          slug: 'primitive-types',
          content: [
            { tab: 'Theory', markdown: '/motoko-tutorial/03-types/primitive-types/theory.md' },
          ],
          files: [
            { path: '/motoko-tutorial/03-types/primitive-types/main.mo', language: 'motoko' },
          ],
          solution: { markdown: '/motoko-tutorial/03-types/primitive-types/solution.md' },
        },
        {
          name: 'Optional types',
          slug: 'optional-types',
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
          name: 'Type aliases',
          slug: 'type-aliases',
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
  ],
};
