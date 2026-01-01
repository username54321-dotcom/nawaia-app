// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js";
import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../utils/database.types.ts";
const app = new Hono();
app.use(cors());

// Logic

app.post(async (ctx) => {
  // Fetch UUID from request.
  const body = await ctx.req.json();
  const uuid = body.uuid;

  // Create Service Role Client
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const url = Deno.env.get("SUPABASE_URL") ?? "";
  const supabase = createClient<Database>(url, key);

  // Check if approved
  const isApproved =
    ((await supabase.from("profiles").select("approved").eq("user_id", uuid)
      .single()).data?.approved) ?? false;
  return ctx.json({ approved: isApproved });
});

Deno.serve(app.fetch);
