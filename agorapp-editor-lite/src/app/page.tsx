import Link from 'next/link';

const html = `<iframe src="https://dfinity-editor-poc.vercel.app/motoko-tutorial" allowFullScreen></iframe>`;

export default function IndexPage() {
  return (
    <div>
      <h1>Embeddable AgorApp Editor</h1>
      <p>To embed the editor, put the following HTML into your page:</p>
      <pre>{html}</pre>

      <p>
        <Link href="https://codepen.io/roman-masek/pen/poQbomE">See example on CodePen</Link>
      </p>

      <p>
        <Link href="/editor/motoko-tutorial">Go directly to tutorial</Link>
      </p>
    </div>
  );
}
