// eslint-disable-next-line import/no-unresolved
import "jsr:@supabase/functions-js@2/edge-runtime.d.ts";
import { handleCors } from "./../../../utils/handleCors.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
Deno.serve(async (req: Request) => {
  // Handle Preflight
  handleCors(req);

  const data = {
    message: `Hello There!`,
  };
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
