import ky from "ky";

const FORTNITE_IO = process.env.FORTNITE_API_IO_KEY!;
const FORTNITE_COM = process.env.FORTNITE_API_COM_KEY!;

export interface FortniteStats {
  epicId: string;
  username: string;
  mode: string;
  matches: number;
  wins: number;
  kills: number;
  kd: number;
  winRate: number;
  top10Rate?: number;
  avgPlacement?: number;
  platform?: string;
  raw: any;
}

const clientIO = ky.create({ prefixUrl: "https://fortniteapi.io/v1", headers: { Authorization: FORTNITE_IO }});
const clientCOM = ky.create({ prefixUrl: "https://fortnite-api.com/v2", headers: { Authorization: FORTNITE_COM }});

export async function getEpicId(username: string) {
  try {
    const res: any = await clientIO.get("lookup", { searchParams: { username } }).json();
    if (res.result && res.account_id) return { epicId: res.account_id, username: res.username ?? username };
  } catch {}
  try {
    const res: any = await clientCOM.get("stats/br", { searchParams: { name: username } }).json();
    if (res?.data?.account?.id) return { epicId: res.data.account.id, username: res.data.account.name ?? username };
  } catch {}
  throw new Error("Player not found");
}

export async function getPlayerStats(epicId: string): Promise<FortniteStats> {
  try {
    const res: any = await clientIO.get(`stats`, { searchParams: { account: epicId } }).json();
    const br = res.global_stats ?? {};
    return {
      epicId,
      username: res.name ?? res.username ?? "",
      mode: "br",
      matches: br.matchesplayed ?? br.matches ?? 0,
      wins: br.placetop1 ?? br.wins ?? 0,
      kills: br.kills ?? 0,
      kd: br.kd ?? (br.kills ?? 0) / Math.max(1, (br.matches ?? 1) - (br.wins ?? 0)),
      winRate: br.winrate ?? ((br.wins ?? 0) / Math.max(1, br.matches ?? 1)) * 100,
      top10Rate: br.placetop10 ?? undefined,
      avgPlacement: br.avg_placement ?? undefined,
      platform: res.account?.platform,
      raw: res
    };
  } catch {}
  const res: any = await clientCOM.get(`stats/br/v2/${epicId}`).json();
  const br = res?.data?.stats?.all?.overall ?? {};
  return {
    epicId,
    username: res?.data?.account?.name ?? "",
    mode: "br",
    matches: br.matches ?? 0,
    wins: br.wins ?? 0,
    kills: br.kills ?? 0,
    kd: br.kd ?? (br.kills ?? 0) / Math.max(1, (br.matches ?? 1) - (br.wins ?? 0)),
    winRate: br.winRate ?? ((br.wins ?? 0) / Math.max(1, br.matches ?? 1)) * 100,
    top10Rate: br.top10 ?? undefined,
    avgPlacement: br.avgPlacement ?? undefined,
    platform: res?.data?.account?.platform,
    raw: res
  };
}
