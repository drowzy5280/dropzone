// app/api/stripe/checkout/route.ts
export async function POST() {
  return new Response("Pro paused", { status: 410 });
}
