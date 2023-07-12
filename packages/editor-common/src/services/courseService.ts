import { TCourse, TLesson } from '@agorapp-dao/content-common';
import { useJson } from '../hooks/useJson';
import { useText } from '../hooks/useText';
import { IEditorFile } from '../types/IEditorFile';

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

  async fetchContent(course: TCourse, contentPath: string): Promise<string> {
    const res = await fetch(this.getContentPath(course, contentPath) as string);
    return res.text();
  }

  getContentPath(course: TCourse | undefined, contentPath: string | undefined) {
    if (!course || !contentPath) {
      return undefined;
    }

    return `/content/content-${course.slug}/${contentPath}`;
  }

  getCoursePath(courseSlug: string, lessonSlug?: string) {
    if (!lessonSlug) {
      return `/course/${courseSlug}`;
    }
    return `/course/${courseSlug}/${lessonSlug}`;
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

  async getLessonFiles(course: TCourse, lessonSlug: string): Promise<IEditorFile[]> {
    const lesson = this.findLessonBySlug(course, lessonSlug);
    if (!lesson) {
      throw new Error(`Lesson ${lessonSlug} not found in course ${course.slug}`);
    }

    if (!lesson.files) {
      return [];
    }

    const contents = await Promise.all(
      lesson.files.map(file => courseService.fetchContent(course, file)),
    );

    const files: IEditorFile[] = lesson.files.map((file, index) => ({
      path: file,
      content: contents[index] || '',
    }));

    const rootEndIndex = this._findCommonRoot(files.map(file => file.path));
    for (const file of files) {
      file.path = file.path.substring(rootEndIndex + 1);
    }

    return files;
  }

  _findCommonRoot(paths: string[]): number {
    let longest = 0;
    for (const path of paths) {
      if (path.length > longest) {
        longest = path.length;
      }
    }

    // last `/` character found in the paths
    let lastSlashFound = 0;
    for (let i = 0; i < longest; i++) {
      const char = paths[0][i];
      if (paths.some(path => path[i] !== char)) {
        return lastSlashFound;
      }
      if (char === '/') {
        lastSlashFound = i;
      }
    }

    return lastSlashFound;
  }
}

export const courseService = new CourseService();
