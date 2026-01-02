import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../../../utils/database.types.ts";

const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const url = Deno.env.get("SUPABASE_URL") ?? "";

export const supabase = createClient<Database>(url, key);
