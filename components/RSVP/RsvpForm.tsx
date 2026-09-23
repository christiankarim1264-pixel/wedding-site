import "./styles.css";

export default function RsvpForm() {
  return (
    <form className="RsvpForm" action="/" method="post">
      <h2 className="rsvpTitle">RS&nbsp;&nbsp;&nbsp;VP</h2>
      <p className="rsvpSubtext">
        Kindly respond by December 1st, 2026
      </p>

      <div className="rsvpField">
        <label className="rsvpLabel" htmlFor="firstName">
          First Name
        </label>
        <input
          className="rsvpInput"
          id="firstName"
          name="firstName"
          placeholder="Uncle"
          required
        />
      </div>

      <div className="rsvpField">
        <label className="rsvpLabel" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="rsvpInput"
          id="lastName"
          name="lastName"
          placeholder="Sam"
          required
        />
      </div>

      <div className="rsvpField">
        <label className="rsvpLabel" htmlFor="phone">
          Phone Number
        </label>
        <input
          className="rsvpInput"
          type="tel"
          id="phone"
          name="phone"
          placeholder="(888)-888-8888"
          required
        />
      </div>

      <fieldset className="rsvpRadioGroup">
        <legend className="rsvpLabel">Will you be attending?</legend>

        <div className="rsvpRadioOption">
          <input
            className="rsvpRadio"
            type="radio"
            id="attending-yes"
            name="attending"
            value="yes"
            required
          />
          <label className="rsvpRadioLabel" htmlFor="attending-yes">
            I will be attending
          </label>
        </div>

        <div className="rsvpRadioOption">
          <input
            className="rsvpRadio"
            type="radio"
            id="attending-no"
            name="attending"
            value="no"
            required
          />
          <label className="rsvpRadioLabel" htmlFor="attending-no">
            I am unable to attend
          </label>
        </div>
      </fieldset>

      <button className="rsvpSubmit" type="submit">
        Send RSVP
      </button>
    </form>
  );
}
