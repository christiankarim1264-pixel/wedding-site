'use client';

import { useState } from "react";
import "./styles.css";

let nextGuestId = 1;

export default function RsvpForm() {
  const [guestIds, setGuestIds] = useState([0]);

  const addGuest = () => {
    setGuestIds((ids) => [...ids, nextGuestId++]);
  };

  const removeGuest = (id: number) => {
    setGuestIds((ids) => ids.filter((guestId) => guestId !== id));
  };

  return (
    <form className="RsvpForm" action="/" method="post">
      <h2 className="rsvpTitle">RS&nbsp;&nbsp;&nbsp;VP</h2>
      <p className="rsvpSubtext">
        Kindly respond by December 1st, 2026
      </p>

      {guestIds.map((id, index) => (
        <div className="rsvpGuestGroup" key={id}>
          {index > 0 && (
            <div className="rsvpGuestHeader">
              <span className="rsvpLabel">Guest {index + 1}</span>
              <button
                className="rsvpRemoveGuest"
                type="button"
                onClick={() => removeGuest(id)}
              >
                Remove
              </button>
            </div>
          )}

          <div className="rsvpField">
            <label className="rsvpLabel" htmlFor={`firstName-${id}`}>
              First Name
            </label>
            <input
              className="rsvpInput"
              id={`firstName-${id}`}
              name={`firstName-${id}`}
              placeholder="Uncle"
              required
            />
          </div>

          <div className="rsvpField">
            <label className="rsvpLabel" htmlFor={`lastName-${id}`}>
              Last Name
            </label>
            <input
              className="rsvpInput"
              id={`lastName-${id}`}
              name={`lastName-${id}`}
              placeholder="Sam"
              required
            />
          </div>
        </div>
      ))}

      <button className="rsvpAddGuest" type="button" onClick={addGuest}>
        + Add Guest
      </button>

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
