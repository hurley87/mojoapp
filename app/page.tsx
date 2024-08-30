import GetStarted from '@/components/get-started';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const username = searchParams?.username || '';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GetStarted username={username} />
    </main>
  );
}
