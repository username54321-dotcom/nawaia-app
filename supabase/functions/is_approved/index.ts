// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

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

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/is_approved' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
