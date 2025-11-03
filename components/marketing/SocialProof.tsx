import { Card } from "./Section";

export default function SocialProof() {
  const quotes = [
    { q: "I stopped doom-queueing and started winning. The streaks + highlights told me exactly what to fix.", a: "@Arkyn" },
    { q: "The radar chart is such a cheat code. I can see what to work on.", a: "Jae" },
  ];
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {quotes.map((it, i) => (
        <Card key={i}>
          <p className="text-gray-100">"{it.q}"</p>
          <div className="text-xs text-gray-400 mt-2">— {it.a}</div>
        </Card>
      ))}
    </div>
  );
}
