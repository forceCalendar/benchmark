import './globals.css';

export const metadata = {
  title: 'forceCalendar Benchmark',
  description: 'Performance benchmarks for @forcecalendar/core',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
