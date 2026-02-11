import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

/**
 * CORS strategy for embeddable widgets:
 * - Browsers on customer domains call this endpoint cross-origin.
 * - We return Access-Control-Allow-Origin using the request origin if it matches site's domain_url.
 * - OPTIONS preflight must be handled explicitly for JSON POST.
 */
function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

async function resolveAllowedOrigin(siteId: string, origin: string | null) {
  if (!origin) return null;

  const { data: site } = await supabaseAdmin
    .from("sites")
    .select("id, domain_url, profiles:profiles!sites_user_id_fkey(subscription_status)")
    .eq("id", siteId)
    .single();

  if (!site) return null;

  const normalizedOrigin = origin.replace(/\/$/, "");
  const normalizedDomain = String(site.domain_url).replace(/\/$/, "");
  const isOriginAllowed = normalizedOrigin === normalizedDomain;
  const status = (site.profiles as { subscription_status?: string } | null)?.subscription_status;

  if (!isOriginAllowed || !["active", "trialing"].includes(status ?? "inactive")) return null;
  return normalizedOrigin;
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "*";
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const body = await req.json();
  const { site_id, consumer_email, request_type = "opt_out_admt" } = body;

  if (!site_id || !consumer_email) {
    return NextResponse.json({ error: "site_id and consumer_email are required" }, { status: 400 });
  }

  const allowedOrigin = await resolveAllowedOrigin(site_id, origin);
  if (!allowedOrigin) {
    return NextResponse.json({ error: "Origin not allowed or inactive subscription" }, { status: 403 });
  }

  const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = req.headers.get("user-agent");

  const { error } = await supabaseAdmin.from("opt_out_requests").insert({
    site_id,
    consumer_email,
    request_type,
    ip_address: ipAddress,
    user_agent: userAgent,
    status: "pending",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders(allowedOrigin) });
  }

  return NextResponse.json({ ok: true, message: "Your request has been recorded." }, { headers: corsHeaders(allowedOrigin) });
}
