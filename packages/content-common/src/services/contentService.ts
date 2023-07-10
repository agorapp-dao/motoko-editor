import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { TCourse } from '../types/course';

// get root of the content-common package
const pkgPath = findPackageJson(path.resolve(fileURLToPath(import.meta.url), '..'));
if (!pkgPath) {
  throw new Error('Could not find package.json for content-common');
}

class ContentService {
  /**
   * Gets information about the course from the npm dependencies. Looks for `@agorapp/content-*` packages.
   *
   * @param courseSlug
   */
  async getCourse(courseSlug: string): Promise<TCourse | undefined> {
    // any content is a sibling dependency of this package
    const courseJsonPath = path.join(
      pkgPath,
      '..',
      `content-${encodeURIComponent(courseSlug)}`,
      'public',
      'course.json',
    );

    try {
      const courseJson = await fsp.readFile(courseJsonPath, 'utf-8');
      return JSON.parse(courseJson);
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        return undefined;
      }
      console.error(`Error loading course.json from ${courseJsonPath}`);
      throw err;
    }
  }

  /**
   * Gets course content from the npm dependencies. Looks for `@agorapp/content-*` packages.
   *
   * @param course
   * @param contentPath
   */
  async getContent(course: TCourse, contentPath: string): Promise<string> {
    // any content is a sibling dependency of this package
    const fullPath = path.join(
      pkgPath,
      '..',
      `content-${encodeURIComponent(course.slug)}`,
      'public',
      contentPath,
    );

    try {
      const content = await fsp.readFile(fullPath, 'utf-8');
      return content;
    } catch (err: any) {
      console.error(`Error loading ${fullPath}`);
      throw err;
    }
  }

  async listContentPackages(): Promise<string[]> {
    const nodeModulesDir = path.join(pkgPath, '..');
    let dirs = await fsp.readdir(nodeModulesDir);
    return dirs;
  }
}

export const contentService = new ContentService();

function findPackageJson(dir: string): string {
  const filePath = path.join(dir, 'package.json');

  if (fs.existsSync(filePath)) {
    return dir;
  }

  const parentDir = path.resolve(dir, '..');

  // Reached the root directory and didn't find package.json
  if (parentDir === dir) {
    throw new Error(`Could not find package.json for ${dir}`);
  }

  return findPackageJson(parentDir);
}
