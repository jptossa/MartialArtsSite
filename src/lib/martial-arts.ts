import { martialArts } from "@/lib/mock-data/martial-arts";
import type { MartialArt } from "@/lib/types";

// Single data-access seam. Swap these bodies for Supabase queries later;
// callers (pages) should not need to change.

export async function getMartialArts(): Promise<MartialArt[]> {
  return martialArts;
}

export async function getMartialArtBySlug(
  slug: string,
): Promise<MartialArt | null> {
  return martialArts.find((art) => art.slug === slug) ?? null;
}
