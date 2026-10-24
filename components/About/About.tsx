import "./styles.css";
import VenueCards from "./VenueCards";

export default function About() {
    return (
        <section className="aboutSection">
            <h1 className="aboutHeading">About the Venue</h1>
            <p className="aboutIntro">Take a little tour of where we&apos;ll be celebrating. Please dress in formal attire.</p>
            <VenueCards />
        </section>
    );
}
