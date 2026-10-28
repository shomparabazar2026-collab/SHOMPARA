import './globals.css';
import { Hind_Siliguri } from 'next/font/google';

const font = Hind_Siliguri({ subsets: ['bengali', 'latin'], weight: ['400', '500', '700'] });

export const metadata = {
  title: 'সম্পাড়া বাজার',
  description: 'আপনার গ্রামের বাজার, এখন ঘরে বসেই',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={font.className}>{children}</body>
    </html>
  );
}
