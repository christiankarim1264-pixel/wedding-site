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
  attending BOOLEAN NOT NULL
);

CREATE TABLE guests (
  id SERIAL PRIMARY KEY,
  rsvp_id INTEGER NOT NULL REFERENCES rsvps(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);
```