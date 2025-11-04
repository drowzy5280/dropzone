/* @jsxImportSource react */
import { ImageResponse } from "@vercel/og";
import { prisma } from "@/lib/prisma";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const matchId = searchParams.get("matchId");
  if (!matchId) return new Response("matchId required", { status: 400 });
  const m = await prisma.matchSnapshot.findUnique({ where: { id: matchId } });
  if (!m) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    (
      <div style={{ height: 630, width: 1200, background: "#000", color: "#fff", display: "flex", padding: 48, fontSize: 36, gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ fontSize: 64, fontWeight: 800 }}>
            Drop<span style={{ background: "linear-gradient(90deg,#00FF88,#9A4DFF)", WebkitBackgroundClip: "text", color: "transparent" }}>zone</span>
          </div>
          <div>Kills: <b>{m.kills}</b> • Win: <b>{m.win ? "Yes" : "No"}</b></div>
          <div style={{ fontSize: 24, color: "#aaa" }}>
            {m.username} — {new Date(m.endedAt).toLocaleString()}
          </div>
          <div style={{ height: 2, width: 600, background: "linear-gradient(90deg,transparent,#9A4DFF,transparent)" }} />
          <div style={{ fontSize: 24, color: "#a3a3ab" }}>Land smart. Win more.</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
