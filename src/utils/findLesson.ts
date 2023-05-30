import { TLesson } from '@/src/types/education';

export default function findLessonRecursively(
  content: TLesson[],
  slug: string,
): TLesson | undefined {
  for (const lesson of content) {
    if (lesson.slug === slug) {
      return lesson;
    }

    if (lesson.children) {
      const found = findLessonRecursively(lesson.children, slug);
      if (found) {
        return found;
      }
    }
  }
}
