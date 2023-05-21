import {TLesson} from "@/app/types/education";

export const DEMO_COURSE: TLesson[] = [
  {
    name: 'Basics',
    slug: 'basics',
    content: [{tab: 'Theory', markdown: '/markdown1.md'}],
    children: [{
      name: 'Printing values',
      slug: 'printing-values',
      content: [{tab: 'Theory', markdown: '/markdown2.md'}],
    }, {
      name: 'Mutable vs immutable variables',
      slug: 'mutable-vs-immutable-variables',
      content: [{tab: 'Theory', markdown: '/markdown.md'}],
    }]
  }, {
    name: 'Types',
    slug: 'types',
    content: [{tab: 'Theory', markdown: '/markdown.md'}],
    children: [{
      name: 'Primitive types',
      slug: 'primitive-types',
      content: [{tab: 'Theory', markdown: '/markdown.md'}],
    }, {
      name: 'Unit type',
      slug: 'unit-type',
      content: [{tab: 'Theory', markdown: '/markdown.md'}],
    }]
  }
];
