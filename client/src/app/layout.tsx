import { Montserrat } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './global.css';
import Sidebar from '../components/sidebar/SideBar';
import MainContentWithWidgets from '../components/layout/MainContentWithWidgets';

// import { ApolloClientProvider } from '@/_providers/apollo-provider';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-main',
  display: 'swap',
});

export const metadata = {
  title: 'University Guide',
  description: 'Your university goals. Your personalized roadmap.',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="bg-app h-screen overflow-hidden">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <MainContentWithWidgets>{children}</MainContentWithWidgets>
        </div>
        {/* <ApolloClientProvider>{children}</ApolloClientProvider> */}
      </body>
    </html>
  );
}
