"use client";

import { useState } from "react";
import CreerGuideForm from "./components/CreerGuideForm";
import DemanderGuideList from "./components/DemanderGuideList";

export default function GuidePage() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const handleMainButtonClick = () => {
    setShowOptions(!showOptions);
    setSelectedAction(null);
  };

  const handleCreerClick = () => {
    setSelectedAction("creer");
    setShowOptions(false);
  };

  const handleDemanderClick = () => {
    setSelectedAction("demander");
    setShowOptions(false);
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage:
          "url('data:image/jpeg;base64,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')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay sombre pour améliorer la lisibilité */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          pointerEvents: "none", // pour ne pas bloquer les clics
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "2rem",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
          Guides
        </h1>

        <button
          onClick={handleMainButtonClick}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s, transform 0.2s",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0051b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0070f3")}
        >
          {showOptions ? "Masquer les options" : "Afficher les options"}
        </button>

        {showOptions && (
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <button
              onClick={handleDemanderClick}
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                backgroundColor: "transparent",
                color: "white",
                border: "2px solid white",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s, border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255,255,255,0.2)";
                e.target.style.borderColor = "#0070f3";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.borderColor = "white";
              }}
            >
              Demander un guide
            </button>
            <button
              onClick={handleCreerClick}
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                backgroundColor: "transparent",
                color: "white",
                border: "2px solid white",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s, border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255,255,255,0.2)";
                e.target.style.borderColor = "#0070f3";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.borderColor = "white";
              }}
            >
              Créer un guide
            </button>
          </div>
        )}

        <div style={{ marginTop: "2rem" }}>
          {selectedAction === "creer" && <CreerGuideForm />}
          {selectedAction === "demander" && <DemanderGuideList />}
        </div>
      </div>
    </div>
  );
}