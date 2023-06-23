import { TCourse, TLesson } from '@agorapp/content-common';
import { useJson } from '../hooks/useJson';
import { useText } from '../hooks/useText';

class CourseService {
  /**
   * Fetches information about the specified course.
   * @param courseSlug
   */
  useCourse(courseSlug: string | undefined) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useJson<TCourse>(`/api/course/${courseSlug}`);
  }

  /**
   * Fetches content from the specified course.
   *
   * @param course
   * @param contentPath
   */
  useContent(course: TCourse | undefined, contentPath: string | undefined) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useText(this.getContentPath(course, contentPath));
  }

  getContentPath(course: TCourse | undefined, contentPath: string | undefined) {
    if (!course || !contentPath) {
      return undefined;
    }

    return `/content-${course.slug}/${contentPath}`;
  }

  findLessonBySlug(course: TCourse | undefined, lessonSlug: string | undefined) {
    if (!course || !lessonSlug) {
      return undefined;
    }
    return this.findLessonInner(course.lessons, lesson => lesson.slug === lessonSlug);
  }

  findLesson(course: TCourse, predicate: (lesson: TLesson) => boolean): TLesson | undefined {
    return this.findLessonInner(course.lessons, predicate);
  }

  private findLessonInner(
    lessons: TLesson[],
    predicate: (lesson: TLesson) => boolean,
  ): TLesson | undefined {
    for (const lesson of lessons) {
      if (predicate(lesson)) {
        return lesson;
      }

      if (lesson.children) {
        const found = this.findLessonInner(lesson.children, predicate);
        if (found) {
          return found;
        }
      }
    }

    return undefined;
  }

  /**
   * Finds next lesson to which user can navigate.
   *
   * @param course
   * @param currentLesson Slug of the current lesson.
   */
  nextLesson(course: TCourse, currentLesson: string) {
    return this.findSiblingLesson(course, currentLesson, 1);
  }

  /**
   * Finds previous lesson to which user can navigate.
   *
   * @param course
   * @param currentLesson Slug of the current lesson.
   */
  prevLesson(course: TCourse, currentLesson: string) {
    return this.findSiblingLesson(course, currentLesson, -1);
  }

  private findSiblingLesson(course: TCourse, currentLesson: string, delta: number) {
    // start by collecting all the lessons in the course (depth first)
    let lessons = course.lessons;
    for (let lesson of lessons) {
      if (lesson.children) {
        lessons = lessons.concat(lesson.children);
      }
    }
    // filter out lessons without content
    lessons = lessons.filter(l => !!l.content);

    const currentLessonIndex = lessons.findIndex(l => l.slug === currentLesson);
    return lessons[currentLessonIndex + delta];
  }
}

export const courseService = new CourseService();
