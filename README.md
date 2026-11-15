# Christian & Raakel's Wedding Website

The website for our wedding on **January 23, 2027** at the Pioneer Living History Museum in Arizona. Guests can see photos, learn about the venue, find our registry, and RSVP online.

## Features

- **Home page:** a scrolling photo carousel and a live countdown to the wedding day
- **RSVP:** a form inside a decorative vintage frame where guests can add everyone in their party; responses are saved to a Postgres database
- **About the Venue:** details and photos of the Pioneer Living History Museum
- **Registry:** a link to our Amazon wedding registry
- **Mobile-friendly:** looks good on phones and desktops

## Built With

- [Next.js 16](https://nextjs.org) (App Router, Server Actions)
- [React 19](https://react.dev) and TypeScript
- [Tailwind CSS 4](https://tailwindcss.com), alongside plain CSS files for each component
- [Neon](https://neon.tech) serverless Postgres for storing RSVPs
- Google Fonts: EB Garamond and Monsieur La Doulaise

## Project Structure

```
app/
  page.tsx            Home page
  RSVP/               RSVP page and thank-you page
  About/              About the Venue page
  registry/           Registry page
  globals.css         Site-wide styles and color variables
components/
  Header/             Names, date, countdown, and navigation
  Carousel/           Scrolling photo strip on the home page
  RSVP/               RSVP form and the server action that saves it
  About/              Venue cards and image gallery
  Banner/             Dismissible banner at the top of the home page
  Footer/
public/pictures/      Photos and decorative artwork
```

## Database Setup

Add your connection string to a `.env.local` file as `POSTGRES_URL`.

The RSVP form saves to two tables: one row in `rsvps` per form submission, and one row in `guests` for each person in the party.

```sql
CREATE TABLE rsvps (
  id SERIAL PRIMARY KEY,
  phone TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE guests (
  id SERIAL PRIMARY KEY,
  rsvp_id INTEGER NOT NULL REFERENCES rsvps(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL -- copied from the guest's RSVP
);

-- Fill guests.phone from the RSVP when an insert leaves it out.
CREATE FUNCTION guests_fill_phone() RETURNS trigger AS $$
BEGIN
  IF NEW.phone IS NULL THEN
    SELECT phone INTO NEW.phone FROM rsvps WHERE id = NEW.rsvp_id;
  END IF;
  RETURN NEW;
END $$ LANGUAGE plpgsql;

CREATE TRIGGER guests_fill_phone BEFORE INSERT ON guests
  FOR EACH ROW EXECUTE FUNCTION guests_fill_phone();

-- A phone number can RSVP several times (e.g. parents, then their kids),
-- but the same name from the same phone number is declined.
CREATE UNIQUE INDEX guests_phone_name_unique
  ON guests (phone, lower(first_name), lower(last_name));
```

Different guests can share a name, so names are not deduplicated automatically. To find names that appear more than once (e.g. a partner who RSVP'd separately from their own phone), run `SELECT * FROM duplicate_guests;`. The view is defined as:

```sql
CREATE OR REPLACE VIEW duplicate_guests AS
SELECT g.first_name, g.last_name, g.id AS guest_id,
       r.id AS rsvp_id, r.phone, r.attending, r.created_at
FROM guests g
JOIN rsvps r ON r.id = g.rsvp_id
WHERE (lower(g.first_name), lower(g.last_name)) IN (
  SELECT lower(first_name), lower(last_name)
  FROM guests
  GROUP BY lower(first_name), lower(last_name)
  HAVING count(*) > 1
)
ORDER BY lower(g.last_name), lower(g.first_name), r.created_at;
```