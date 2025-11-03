import { Card } from "./Section";

const faqs = [
  { q: "Do I have to connect my Epic account?", a: "No. You can look up any public name. Connecting Epic simply verifies identity and adds trust." },
  { q: "How 'real-time' is it?", a: "Providers update within ~1–3 minutes after a match. Keep your player page open for auto-refresh." },
  { q: "Will this get me banned?", a: "No overlays, no memory reads—just public stats and your consented data." },
  { q: "Which platforms are supported?", a: "Any platform with public Fortnite stats (PC/console). Epic login is optional." },
  { q: "What about refunds?", a: "Pro is month-to-month. Cancel anytime from your account." },
];

export default function FAQ() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {faqs.map((f, i) => (
        <Card key={i}>
          <div className="font-semibold">{f.q}</div>
          <div className="text-gray-400 text-sm mt-1">{f.a}</div>
        </Card>
      ))}
    </div>
  );
}
