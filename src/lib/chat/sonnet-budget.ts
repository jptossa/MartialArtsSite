import "server-only";
import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/auth";

// Spends one of today's Sonnet slots. The limit and the day boundary live in
// the claim_sonnet_slot() SQL function (see supabase/migrations). Fails closed:
// if Supabase is unconfigured or errors, no Sonnet call is made, so spend can
// never exceed the cap because of an outage.
export async function claimSonnetSlot(): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  try {
    // Plain anon client: no cookies or session involved, so this is safe to
    // call from a route handler outside <Suspense>.
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const { data, error } = await supabase.rpc("claim_sonnet_slot");
    if (error) {
      console.error("chat: claim_sonnet_slot failed", error);
      return false;
    }
    return data === true;
  } catch (error) {
    console.error("chat: claim_sonnet_slot threw", error);
    return false;
  }
}
