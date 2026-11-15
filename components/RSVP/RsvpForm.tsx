'use client';

import { startTransition, useActionState, useState } from "react";
import type { FormEvent } from "react";
import { submitRsvp } from "./actions";
import "./styles.css";

let nextGuestId = 1;

export default function RsvpForm() {
  const [guestIds, setGuestIds] = useState([0]);
  const [state, formAction, pending] = useActionState(submitRsvp, {});

  /* Submitted through onSubmit rather than <form action> because React
clears the form after an action, which would wipe what the guest typed
when an RSVP is declined. */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  const addGuest = () => {
    setGuestIds((ids) => [...ids, nextGuestId++]);
  };

  const removeGuest = (id: number) => {
    setGuestIds((ids) => ids.filter((guestId) => guestId !== id));
  };

  return (
    <form className="RsvpForm" onSubmit={handleSubmit}>
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

      {state.error && (
        <p className="rsvpError" role="alert">
          {state.error}
        </p>
      )}

      {/* Disabled while saving so impatient clicks (the database can take a
      few seconds to wake up) don't send the RSVP again. */}
      <button className="rsvpSubmit" type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send RSVP"}
      </button>
    </form>
  );
}
