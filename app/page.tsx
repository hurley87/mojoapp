import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/test">
        <a className="text-2xl font-bold text-blue-500">Test Page</a>
      </Link>
    </main>
  );
}
