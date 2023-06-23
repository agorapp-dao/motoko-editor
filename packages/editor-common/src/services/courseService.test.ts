import { TCourse } from '@agorapp/content-common';
import { courseService } from './courseService';

const COURSE: TCourse = {
  name: 'Motoko Tutorial',
  slug: 'motoko-tutorial',
  lessons: [
    {
      name: 'Introduction',
      slug: 'introduction',
      content: '/motoko-tutorial/01-introduction/theory.md',
      files: ['/motoko-tutorial/01-introduction/main.mo'],
    },
    {
      name: 'Basics',
      slug: 'basics',
      children: [
        {
          name: 'Printing values',
          slug: 'printing-values',
          content: '/motoko-tutorial/02-basics/print-values/theory.md',
          files: ['/motoko-tutorial/02-basics/print-values/main.mo'],
          solution: '/motoko-tutorial/02-basics/print-values/solution.md',
        },
        {
          name: 'Mutable variables',
          slug: 'mutable-variables',
          content: '/motoko-tutorial/02-basics/mutable-variables/theory.md',
          files: ['/motoko-tutorial/02-basics/mutable-variables/main.mo'],
          solution: '/motoko-tutorial/02-basics/mutable-variables/solution.md',
        },
        {
          name: 'Assigning values',
          slug: 'assigning-values',
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
          content: '/motoko-tutorial/02-basics/immutable-variables/theory.md',
          files: ['/motoko-tutorial/02-basics/immutable-variables/main.mo'],
          solution: '/motoko-tutorial/02-basics/immutable-variables/solution.md',
        },
      ],
    },
  ],
};

describe('courseService', () => {
  test('find next lesson 1', () => {
    const res = courseService.nextLesson(COURSE, 'introduction');
    expect(res?.slug).toEqual('printing-values');
  });

  test('find next lesson 2', () => {
    const res = courseService.nextLesson(COURSE, 'printing-values');
    expect(res?.slug).toEqual('mutable-variables');
  });

  test('find next lesson 3', () => {
    const res = courseService.nextLesson(COURSE, 'mutable-variables');
    expect(res?.slug).toEqual('primitive-types');
  });

  test('find prev lesson 1', () => {
    const res = courseService.prevLesson(COURSE, 'primitive-types');
    expect(res?.slug).toEqual('mutable-variables');
  });

  test('find prev lesson 2', () => {
    const res = courseService.prevLesson(COURSE, 'mutable-variables');
    expect(res?.slug).toEqual('printing-values');
  });

  test('find prev lesson 3', () => {
    const res = courseService.prevLesson(COURSE, 'printing-values');
    expect(res?.slug).toEqual('introduction');
  });
});
