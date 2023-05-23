import {TLesson} from "@/app/types/education";

export default function nextLesson(content: TLesson[], slug: string, firstDepp = false): TLesson | undefined {
  for (const index in content) {
    const lesson = content[index];
    if (lesson.slug === slug) {
      let found: TLesson | undefined;
      if (lesson.children?.length) {
        found = nextLesson(lesson.children, slug, true);
        if (found) {
          return found;
        }
      }

      // TODO implement searching of next on the same level in case that childs does not exists, refactor this
      if (!found && content[parseInt(index+1)]) {
        const lesson = content[parseInt(index+1)];
        if (lesson.children?.length) {
          found = nextLesson(lesson.children, slug, true);
          if (found) {
            return found;
          }
        } else {
          return lesson;
        }
      }
    }

    if (lesson.children?.length) {
      const found = nextLesson(lesson.children, slug, firstDepp);
      if (found) {
        return found;
      }
    } else if (firstDepp) {
      return lesson;
    }
  }
};
