import {TLesson} from "@/app/types/education";

export const DEMO_COURSE: TLesson[] = [
  {
    name: 'Basics',
    slug: '',
    content: [{tab: 'Theory', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}],
    children: [{
      name: 'Printing values',
      slug: '',
      content: [{tab: 'Theory', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}],
    }, {
      name: 'Mutable vs immutable variables',
      slug: '',
      content: [{tab: 'Theory', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}],
    }]
  }, {
    name: 'Types',
    slug: '',
    content: [{tab: 'Theory', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}],
    children: [{
      name: 'Primitive types',
      slug: '',
      content: [{tab: 'Theory', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}],
    }, {
      name: 'Unit type',
      slug: '',
      content: [{tab: 'Theory', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}],
    }]
  }
];
