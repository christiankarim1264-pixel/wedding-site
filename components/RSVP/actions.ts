'use server';

import { redirect } from "next/navigation";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL!);

export async function submitRsvp(formData: FormData) {
  const phone = String(formData.get("phone") ?? "").trim();
  const attending = formData.get("attending") === "yes";

  if (!phone) {
    throw new Error("Phone number is required.");
  }

  /* Guest fields are named firstName-<id>/lastName-<id>, where <id> comes
from the client-side counter in RsvpForm and has no meaning here beyond
pairing a first name with its matching last name. */
  const guestIds = new Set<string>();
  for (const key of formData.keys()) {
    const match = key.match(/^firstName-(.+)$/);
    if (match) guestIds.add(match[1]);
  }

  const guests = Array.from(guestIds)
    .map((id) => ({
      firstName: String(formData.get(`firstName-${id}`) ?? "").trim(),
      lastName: String(formData.get(`lastName-${id}`) ?? "").trim(),
    }))
    .filter((guest) => guest.firstName && guest.lastName);

  if (guests.length === 0) {
    throw new Error("At least one guest is required.");
  }

  const [rsvp] = await sql`
    INSERT INTO rsvps (phone, attending)
    VALUES (${phone}, ${attending})
    RETURNING id
  `;

  for (const guest of guests) {
    await sql`
      INSERT INTO guests (rsvp_id, first_name, last_name)
      VALUES (${rsvp.id}, ${guest.firstName}, ${guest.lastName})
    `;
  }

  redirect("/RSVP/thank-you");
}
