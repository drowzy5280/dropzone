export function Footer() {
  return (
    <footer className="mt-16 py-10 text-sm text-gray-400">
      <div className="flex flex-wrap gap-4">
        <a href="/privacy" className="hover:underline">Privacy</a>
        <a href="/terms" className="hover:underline">Terms</a>
        <a href="/contact" className="hover:underline">Contact</a>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Not affiliated with or endorsed by Epic Games.
      </div>
    </footer>
  );
}
