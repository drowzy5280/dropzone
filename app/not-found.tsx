// app/not-found.tsx
export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-gray-400 mt-2">Try the homepage or search your Epic name.</p>
      <a className="underline mt-4 inline-block" href="/">Go home</a>
    </main>
  );
}
