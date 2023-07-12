import { NextApiRequest, NextApiResponse } from 'next';
import { contentService } from '@agorapp-dao/content-common';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const courseSlug = req.query.courseSlug as string;

    if (!courseSlug) {
      res.status(400).json({ error: 'Missing course slug' });
      return;
    }

    const course = await contentService.getCourse(courseSlug);

    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load data' });
  }
}
