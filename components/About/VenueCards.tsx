"use client";

import { useRef, useState } from "react";
import { venueSections } from "./venueSections";
import VenueImageGallery from "./VenueImageGallery";

export default function VenueCards() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = venueSections.length;

  const goTo = (index: number) => setCurrent((index + total) % total);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -50) next();
    if (deltaX > 50) prev();
    touchStartX.current = null;
  };

  return (
    <div
      className="venueCards"
      role="region"
      aria-roledescription="carousel"
      aria-label="Venue tour"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="venueViewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="venueTrack"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {venueSections.map((section, index) => (
            <article
              key={section.title}
              className="venueCard"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}`}
              aria-hidden={index !== current}
            >
              <VenueImageGallery
                images={section.images ?? []}
                title={section.title}
                active={index === current}
                aspectRatio={section.aspectRatio}
              />
              <div className="venueBody">
                <h2 className="venueTitle">{section.title}</h2>
                {section.subtitle && (
                  <p className="venueSubtitle">{section.subtitle}</p>
                )}
                <p className="venueDescription">{section.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="venueControls">
        <button
          className="venueNavBtn"
          onClick={prev}
          aria-label="Previous card"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
        </button>
        <div className="venueDots">
          {venueSections.map((section, index) => (
            <button
              key={section.title}
              className={`venueDot${index === current ? " active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Go to ${section.title}`}
              aria-current={index === current}
            />
          ))}
        </div>
        <button className="venueNavBtn" onClick={next} aria-label="Next card">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      <p className="venueCounter">
        {current + 1} / {total}
      </p>
    </div>
  );
}
