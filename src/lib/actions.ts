"use server";

export type LeadPayload = {
  name: string;
  whatsapp: string;
  email: string;
  audience?: string;
  preference?: string;
  area?: string;
};

export async function submitLead(payload: LeadPayload) {
  const endpoint = process.env.LEAD_WEBHOOK_URL;

  if (endpoint) {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        source: "website-router",
        createdAt: new Date().toISOString()
      })
    });
  }

  return { ok: true };
}
