import { MedievalSharp } from 'next/font/google';
import './globals.css';
import HomePage from './(pages)/all/page';

const medievalSharp = MedievalSharp({ subsets: ["latin"], weight: "400" });

export default function MainPage() {
  return (
    <main>
      {/* <h1 className={medievalSharp.className}>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p> */}
      <HomePage />
    </main>
  );
} 