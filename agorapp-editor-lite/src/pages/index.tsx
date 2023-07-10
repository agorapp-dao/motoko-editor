import Link from 'next/link';
import { contentService } from '@agorapp/content-common';
import { courseService } from '@agorapp/editor-common';

type IndexPageProps = {
  contentPackages: string[];
};

export default function IndexPage({ contentPackages }: IndexPageProps) {
  return (
    <div>
      <ul>
        {contentPackages.map(cp => (
          <li key={cp}>
            <Link href={`${courseService.getCoursePath(cp)}`}>{cp}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  let contentPackages = await contentService.listContentPackages();
  contentPackages = contentPackages.filter(
    cp => cp.startsWith('content-') && cp !== 'content-common',
  );
  contentPackages = contentPackages.map(cp => cp.substring('content-'.length));

  return { props: { contentPackages } };
}
