import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StoreProvider } from '@/context/StoreContext';

export const metadata = {
  title: 'IPrints Commerce',
  description: 'Modern eCommerce shopping experience'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
