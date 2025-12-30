import { createClient } from "@/lib/supabase/server";

export async function ensureDealerProfile(userId: string) {
  const supabase = await createClient();

  const { data: existingProfile } = await supabase
    .from("dealer_profiles")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (!existingProfile) {
    await supabase
      .from("dealer_profiles")
      .insert({ user_id: userId, role: "dealer" });
  }
}

export async function getDealerProfile(userId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("dealer_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  return data;
}
