"use client";

import { useState } from "react";

export default function CreerGuideForm() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
    circuit: "",
    dateNaissance: "",
    lieuNaissance: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    try {
      const res = await fetch('/api/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Erreur lors de la création');
      setSubmitMessage({ type: "success", text: "Guide créé avec succès !" });
      setFormData({
        nom: "", prenom: "", adresse: "", telephone: "", circuit: "",
        dateNaissance: "", lieuNaissance: "",
      });
    } catch (error) {
      setSubmitMessage({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      }}
    >
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", textAlign: "center", color: "#0070f3" }}>
        Créer un guide
      </h2>

      {submitMessage && (
        <div
          style={{
            padding: "0.75rem",
            marginBottom: "1rem",
            backgroundColor: submitMessage.type === "success" ? "#d4edda" : "#f8d7da",
            border: `1px solid ${submitMessage.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
            borderRadius: "4px",
            color: submitMessage.type === "success" ? "#155724" : "#721c24",
            textAlign: "center",
          }}
        >
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
              Nom :
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
              Prénom :
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
            Adresse :
          </label>
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
            Téléphone :
          </label>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
            Circuit proposé :
          </label>
          <input
            type="text"
            name="circuit"
            value={formData.circuit}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
              Date de naissance :
            </label>
            <input
              type="date"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
              Lieu de naissance :
            </label>
            <input
              type="text"
              name="lieuNaissance"
              value={formData.lieuNaissance}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "0.9rem",
            marginTop: "2rem",
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.7 : 1,
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = "#0051b3")}
          onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = "#0070f3")}
        >
          {isSubmitting ? "Création en cours..." : "Créer le guide"}
        </button>
      </form>
    </div>
  );
}