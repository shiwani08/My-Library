import { MedievalSharp } from 'next/font/google';
import './globals.css';
import CurrentlyReading from '@/app/pages/currently-reading/page';

const medievalSharp = MedievalSharp({ subsets: ["latin"], weight: "400" });

export default function HomePage() {
  return (
    <main>
      <h1 className={medievalSharp.className}>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>
      {/* <CurrentlyReading /> */}
    </main>
  );
} 