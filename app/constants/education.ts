import {TLesson} from "@/app/types/education";

export const DEMO_COURSE: TLesson[] = [
  {
    name: 'Basics',
    content: [{tab: 'Theory', slug: '', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}],
    children: [{
      name: 'Printing values',
      content: [{tab: 'Theory', slug: '', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}],
    },{
      name: 'Mutable vs immutable variables',
      content: [{tab: 'Theory', slug: '', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}],
    }]
  }, {
    name: 'Types',
    content: [{tab: 'Theory', slug: '', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}],
    children: [{
      name: 'Primitive types',
      content: [{tab: 'Theory', slug: '', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}],
    },{
      name: 'Unit type',
      content: [{tab: 'Theory', slug: '', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}],
    }]
  }
];
