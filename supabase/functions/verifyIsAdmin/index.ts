// eslint-disable-next-line import/no-unresolved
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders, handleCors } from "../../../utils/handleCors.ts";
import { funcParamIsAdmin } from "../../../utils/FunctionTypes/verifyIsAdminTypes.ts";

const adminUuids = [
  "50e44d88-7255-41a4-888f-54906447f692",
  "09b7af41-c884-4454-84df-c733a4e47ecf",
];

Deno.serve(async (req: Request) => {
  const didHandle = handleCors(req); // Handle Options Request
  if (didHandle) {
    return didHandle;
  }
  const { uuid }: funcParamIsAdmin = await req.json();
  const data = { isAdmin: adminUuids.includes(uuid) };
  return new Response(
    JSON.stringify({ ...data }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
