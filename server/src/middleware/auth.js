import { createClient } from "@supabase/supabase-js";

let supabase;
function getSupabase() {
  if (!supabase) {
    const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set in server/.env");
    }
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return supabase;
}

/**
 * Express middleware: requires a valid Supabase access token.
 * Expects:  Authorization: Bearer <access_token>
 * On success: sets req.user (the Supabase user) and req.token, then calls next().
 * On failure: responds 401 with { error }.
 */
export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return res.status(401).json({ error: "Missing or malformed Authorization header" });
  }

  const { data, error } = await getSupabase().auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.user = data.user;
  req.token = token;
  next();
}