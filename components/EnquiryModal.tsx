"use client";

import React, { useState } from "react";

export function EnquiryModal({
  productTitle,
  productId,
  isOpen,
  onClose,
}: {
  productTitle?: string;
  productId?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    productTitle
      ? `I would like to inquire about acquiring "${productTitle}". Please provide shipping details and curatorial provenance.`
      : ""
  );
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          productId,
          type: productId ? "PRODUCT" : "GENERAL",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(36, 34, 30, 0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "var(--color-gallery-ivory)",
          border: "1px solid var(--border-medium)",
          borderRadius: "3px",
          maxWidth: "520px",
          width: "100%",
          padding: "2.5rem 2rem",
          boxShadow: "var(--shadow-elevated)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            color: "var(--color-ink-charcoal)",
          }}
          aria-label="Close Enquiry Modal"
        >
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <span className="kicker">Inquiry Received</span>
            <h3 style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
              Thank You for Reaching Out
            </h3>
            <p style={{ marginBottom: "1.5rem" }}>
              Our curatorial team in Lagos will review your inquiry and contact you
              personally within 24 hours with complete details and collector provenance.
            </p>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Close Window
            </button>
          </div>
        ) : (
          <>
            <span className="kicker">Private Concierge</span>
            <h3 style={{ marginTop: "0.4rem", marginBottom: "0.5rem" }}>
              {productTitle ? `Acquisition Inquiry: ${productTitle}` : "Curatorial Inquiry"}
            </h3>
            <p style={{ fontSize: "0.88rem", marginBottom: "1.5rem" }}>
              Speak directly with our gallery team regarding bespoke commissions,
              white-glove international crating, or custom interior specifications.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone / WhatsApp (Optional)</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+234..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Message or Questions *</label>
                <textarea
                  required
                  rows={4}
                  className="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "0.5rem" }}
              >
                {loading ? "Transmitting..." : "Send Curatorial Inquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
