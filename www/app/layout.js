import './globals.css';

export const metadata = {
  title: 'ForceCalendar vs FullCalendar - Performance Benchmark',
  description: 'Compare performance metrics between ForceCalendar and FullCalendar',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
