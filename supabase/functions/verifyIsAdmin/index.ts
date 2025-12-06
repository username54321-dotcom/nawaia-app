// eslint-disable-next-line import/no-unresolved
import "@supabase/functions-js";
import { corsHeaders, handleCors } from "../../../utils/handleCors.ts";
import { createClient } from "@supabase/supabase-js";

const adminUuids = [
  "50e44d88-7255-41a4-888f-54906447f692",
  "09b7af41-c884-4454-84df-c733a4e47ecf",
];

Deno.serve(async (req: Request) => {
  const didHandle = handleCors(req); // Handle Options Request
  if (didHandle) {
    return didHandle;
  }
  let isAdmin = false;

  const authHeader = req.headers.get("Authorization") ?? false;

  if (authHeader) {
    const client = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } },
    );
    const userUUID = (await client.auth.getUser()).data.user?.id;
    isAdmin = adminUuids.includes(userUUID ?? "");
  }
  const resData = { isAdmin: isAdmin };
  return new Response(JSON.stringify(resData), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
