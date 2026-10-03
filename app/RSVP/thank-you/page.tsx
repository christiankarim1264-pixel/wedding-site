import Header from "@/components/Header/Header";
import "./styles.css";

export default function ThankYou() {
  return (
    <div className="mainContent">
      <Header />
      <div className="thankYouContent">
        <h2 className="thankYouHeading">Thank You</h2>
        <p className="thankYouText">
          Your RSVP has been received. We hope to see you soon!
        </p>
      </div>
    </div>
  );
}
