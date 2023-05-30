import './globals.css';

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'AgorApp Web3Editor',
  description: 'Your one-stop platform for learning All Things Web3 Development',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
