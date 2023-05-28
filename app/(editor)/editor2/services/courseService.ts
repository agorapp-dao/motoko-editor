import { sleep } from '@/app/utils/sleep';
import { DEMO_COURSE2 } from '@/app/constants/education';
import { TCourse } from '@/app/types/education';
import findLessonRecursively from '@/app/utils/findLesson';

export const courseService = {
  async fetchCourse(courseSlug: string): Promise<TCourse> {
    await sleep(300);

    if (courseSlug !== 'demo') {
      throw new Error('Course not found');
    }

    return DEMO_COURSE2;
  },

  async fetchLesson(course: TCourse, lessonSlugs: string[]): Promise<string> {
    await sleep(300);

    const lesson = findLessonRecursively(course.lessons, lessonSlugs[lessonSlugs.length - 1]);

    const mdFile = lesson.content[0].markdown;
    const mdContent = await fetch(mdFile).then(res => res.text());

    return mdContent;
  },
};
