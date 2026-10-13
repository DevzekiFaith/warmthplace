"use client";

import React, { useState } from "react";

export function ContactFormClient() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "Nigeria",
    enquiryType: "ACQUISITION",
    artworkInterest: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [ticketRef, setTicketRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate concierge enquiry dispatch
    setTimeout(() => {
      const generatedRef = `WP-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketRef(generatedRef);
      setStatus("success");
    }, 900);
  };

  if (status === "success") {
    return (
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid var(--border-subtle)",
          padding: "clamp(2rem, 4vw, 3.5rem)",
          borderRadius: "2px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "rgba(147, 87, 66, 0.12)",
            color: "var(--color-terracotta)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <span className="kicker">Enquiry Transmitted</span>
        <h2 style={{ fontSize: "1.9rem", marginTop: "0.5rem", marginBottom: "1rem" }}>
          Thank You for Connecting
        </h2>

        <p style={{ color: "var(--color-ink-light)", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 1.75rem" }}>
          Our Curatorial Concierge has received your inquiry. A senior curator will review your notes
          and reach out within 1 business day with high-resolution dossiers or private viewing availability.
        </p>

        <div
          style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            backgroundColor: "var(--color-gallery-ivory)",
            border: "1px solid var(--border-subtle)",
            fontSize: "0.85rem",
            fontFamily: "var(--font-mono, monospace)",
            marginBottom: "2rem",
          }}
        >
          Reference Code: <strong>{ticketRef}</strong>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                country: "Nigeria",
                enquiryType: "ACQUISITION",
                artworkInterest: "",
                message: "",
              });
            }}
            className="btn btn-secondary"
            style={{ fontSize: "0.82rem" }}
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid var(--border-subtle)",
        padding: "clamp(1.25rem, 4vw, 3rem)",
        borderRadius: "2px",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <span className="kicker">Direct Curatorial Dispatch</span>
        <h2 style={{ fontSize: "1.8rem", marginTop: "0.4rem" }}>
          Send a Curatorial Enquiry
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <div>
          <label
            htmlFor="fullName"
            style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem", color: "var(--color-ink-charcoal)" }}
          >
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Chimamanda Adeleke"
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              border: "1px solid var(--border-subtle)",
              borderRadius: "2px",
              fontFamily: "inherit",
              fontSize: "0.92rem",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem", color: "var(--color-ink-charcoal)" }}
          >
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="collector@domain.com"
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              border: "1px solid var(--border-subtle)",
              borderRadius: "2px",
              fontFamily: "inherit",
              fontSize: "0.92rem",
              outline: "none",
            }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <div>
          <label
            htmlFor="phone"
            style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem", color: "var(--color-ink-charcoal)" }}
          >
            Phone / WhatsApp (Optional)
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+234 800 000 0000"
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              border: "1px solid var(--border-subtle)",
              borderRadius: "2px",
              fontFamily: "inherit",
              fontSize: "0.92rem",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="enquiryType"
            style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem", color: "var(--color-ink-charcoal)" }}
          >
            Enquiry Nature *
          </label>
          <select
            id="enquiryType"
            value={formData.enquiryType}
            onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              border: "1px solid var(--border-subtle)",
              borderRadius: "2px",
              fontFamily: "inherit",
              fontSize: "0.92rem",
              backgroundColor: "#FFFFFF",
              outline: "none",
            }}
          >
            <option value="ACQUISITION">Private Artwork Acquisition</option>
            <option value="VIEWING">Schedule Private Viewing (Lagos Studio)</option>
            <option value="COMMISSION">Bespoke Architectural Commission</option>
            <option value="INTERIOR_DESIGN">Interior Designer & Architect Trade Program</option>
            <option value="INSTITUTIONAL">Museum / Institutional Loan</option>
            <option value="OTHER">General Curatorial Inquiries</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label
          htmlFor="artworkInterest"
          style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem", color: "var(--color-ink-charcoal)" }}
        >
          Artwork(s) or Artist(s) of Interest (Optional)
        </label>
        <input
          id="artworkInterest"
          type="text"
          value={formData.artworkInterest}
          onChange={(e) => setFormData({ ...formData, artworkInterest: e.target.value })}
          placeholder="e.g. Harmattan Procession, The Jazz Trio, or Chinwe Okoli bronzes"
          style={{
            width: "100%",
            padding: "0.85rem 1rem",
            border: "1px solid var(--border-subtle)",
            borderRadius: "2px",
            fontFamily: "inherit",
            fontSize: "0.92rem",
            outline: "none",
          }}
        />
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <label
          htmlFor="message"
          style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem", color: "var(--color-ink-charcoal)" }}
        >
          Message / Specific Architectural Requirements *
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please share details regarding your space, timeline, framing preferences, or delivery location..."
          style={{
            width: "100%",
            padding: "0.85rem 1rem",
            border: "1px solid var(--border-subtle)",
            borderRadius: "2px",
            fontFamily: "inherit",
            fontSize: "0.92rem",
            outline: "none",
            resize: "vertical",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary"
        style={{ width: "100%", padding: "1rem 2rem", fontSize: "0.88rem" }}
      >
        {status === "submitting" ? "Transmitting to Curatorial Team..." : "Submit Curatorial Enquiry →"}
      </button>

      <p style={{ fontSize: "0.76rem", color: "var(--color-ink-light)", textAlign: "center", marginTop: "1rem" }}>
        Direct collector confidentiality guaranteed. Your information is never disclosed to third parties.
      </p>
    </form>
  );
}
