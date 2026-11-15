'use server';

import { redirect } from "next/navigation";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL!);

export type RsvpState = { error?: string };

export async function submitRsvp(
  _prevState: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  /* Stored as digits only so "(480) 842-6946" and "4808426946" count as the
same phone number when checking for repeat RSVPs. */
  const phone = String(formData.get("phone") ?? "").replace(/\D/g, "");
  const attending = formData.get("attending") === "yes";

  if (!phone) {
    return { error: "Please enter a phone number." };
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
      firstName: cleanName(formData.get(`firstName-${id}`)),
      lastName: cleanName(formData.get(`lastName-${id}`)),
    }))
    .filter((guest) => guest.firstName && guest.lastName);

  if (guests.length === 0) {
    return { error: "Please add at least one guest." };
  }

  const firstNames = guests.map((guest) => guest.firstName);
  const lastNames = guests.map((guest) => guest.lastName);

  /* A phone number can be used for several RSVPs (e.g. parents for
themselves, then for their kids), but the same name with the same phone
number is declined. This pre-check gives a friendly message; the unique
index guests_phone_name_unique is what actually guarantees it, including
for double clicks that race past this check. */
  const existing = await sql`
    SELECT first_name, last_name
    FROM guests
    WHERE phone = ${phone}
      AND (lower(first_name), lower(last_name)) IN (
        SELECT lower(f), lower(l)
        FROM unnest(${firstNames}::text[], ${lastNames}::text[]) AS n(f, l)
      )
  `;

  if (existing.length > 0) {
    const names = existing
      .map((guest) => `${guest.first_name} ${guest.last_name}`)
      .join(", ");
    return {
      error: `We already have an RSVP for ${names} from this phone number. If you need to change it, please reach out to us.`,
    };
  }

  try {
    /* One statement, so the RSVP and its guests are saved together or not
at all. */
    await sql`
      WITH new_rsvp AS (
        INSERT INTO rsvps (phone, attending)
        VALUES (${phone}, ${attending})
        RETURNING id
      )
      INSERT INTO guests (rsvp_id, phone, first_name, last_name)
      SELECT new_rsvp.id, ${phone}, f, l
      FROM new_rsvp,
        unnest(${firstNames}::text[], ${lastNames}::text[]) AS n(f, l)
    `;
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      return {
        error:
          "We already have an RSVP for one of these guests from this phone number. If you need to change it, please reach out to us.",
      };
    }
    throw error;
  }

  redirect("/RSVP/thank-you");
}

function cleanName(value: FormDataEntryValue | null) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}
