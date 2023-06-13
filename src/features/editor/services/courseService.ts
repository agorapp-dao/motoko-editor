import { useJson } from '@/src/hooks/useJson';
import { TCourse } from '@/src/types/education';

class CourseService {
  useCourse(courseSlug: string | undefined) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useJson<TCourse>(`/api/course/${courseSlug}`);
  }
}

export const courseService = new CourseService();
