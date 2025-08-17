//SubmitButton.js

import React, { useState } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import CircularProgress from "@mui/material/CircularProgress";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

// Custom Modal Component
const ResultModal = ({ isOpen, onClose, result, isError = false }) => {
  const [timeLeft, setTimeLeft] = useState(8);

  React.useEffect(() => {
    if (!isOpen) return;

    // Auto close timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (isOpen) {
      setTimeLeft(8);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "16px",
          maxWidth: "300px",
          width: "90%",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
          position: "relative",
          border: `2px solid ${isError ? "#ef4444" : "#10b981"}`,
          animation: "modalSlideIn 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "transparent",
            border: "none",
            fontSize: "18px",
            color: "#6b7280",
            cursor: "pointer",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#f3f4f6";
            e.target.style.color = "#374151";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#6b7280";
          }}
        >
          ×
        </button>
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            padding: "2px 6px",
            fontSize: "10px",
            color: "#6b7280",
            fontWeight: "500",
          }}
        >
          Auto-close in {timeLeft}s
        </div>
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          {isError ? (
            <div>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🚫</div>
              <h2
                style={{
                  margin: "0 0 8px 0",
                  color: "#ef4444",
                  fontSize: "18px",
                }}
              >
                Connection Failed
              </h2>
              <div
                style={{
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "6px",
                  padding: "8px",
                  textAlign: "left",
                  marginBottom: "12px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 4px 0",
                    color: "#dc2626",
                    fontWeight: "600",
                    fontSize: "12px",
                  }}
                >
                  ❌ Unable to analyze pipeline
                </p>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    color: "#7f1d1d",
                    fontSize: "11px",
                  }}
                >
                  📡 Check if backend server is running on port 8000
                </p>
                <p
                  style={{
                    margin: "0",
                    color: "#991b1b",
                    fontSize: "10px",
                    fontFamily: "monospace",
                  }}
                >
                  Error: {result?.message || "Unknown error"}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>
                {result?.is_dag ? "🎉" : "⚠️"}
              </div>

              <h2
                style={{
                  margin: "0 0 8px 0",
                  color: result?.is_dag ? "#10b981" : "#f59e0b",
                  fontSize: "18px",
                }}
              >
                Pipeline Analysis Complete
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#f0f9ff",
                    border: "1px solid #bae6fd",
                    borderRadius: "6px",
                    padding: "8px",
                  }}
                >
                  <div style={{ fontSize: "16px", color: "#0ea5e9" }}>📊</div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#0c4a6e",
                    }}
                  >
                    {result?.num_nodes || 0}
                  </div>
                  <div style={{ fontSize: "10px", color: "#0369a1" }}>
                    Nodes
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "6px",
                    padding: "8px",
                  }}
                >
                  <div style={{ fontSize: "16px", color: "#22c55e" }}>🔗</div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#14532d",
                    }}
                  >
                    {result?.num_edges || 0}
                  </div>
                  <div style={{ fontSize: "10px", color: "#166534" }}>
                    Edges
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: result?.is_dag ? "#f0fdf4" : "#fef2f2",
                  border: `1px solid ${result?.is_dag ? "#bbf7d0" : "#fecaca"}`,
                  borderRadius: "6px",
                  padding: "8px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: result?.is_dag ? "#166534" : "#dc2626",
                    }}
                  >
                    {result?.is_dag ? "Valid DAG" : "Not a Valid DAG"}
                  </span>
                </div>

                <p
                  style={{
                    margin: "0",
                    fontSize: "11px",
                    color: result?.is_dag ? "#15803d" : "#b91c1c",
                    textAlign: "center",
                  }}
                >
                  {result?.is_dag
                    ? "🎉 Your pipeline is properly structured!"
                    : "Your pipeline contains cycles. Remove circular dependencies to fix this."}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={onClose}
            style={{
              backgroundColor: isError ? "#ef4444" : "#10b981",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              minWidth: "80px",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0px)";
              e.target.style.boxShadow = "none";
            }}
          >
            Got it!
          </button>
        </div>

        <style>
          {`
            @keyframes modalSlideIn {
              0% {
                opacity: 0;
                transform: translateY(-20px) scale(0.95);
              }
              100% {
                opacity: 1;
                transform: translateY(0px) scale(1);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalResult, setModalResult] = useState(null);
  const [isModalError, setIsModalError] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const pipelineData = {
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data,
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle,
        })),
      };

      const pipelineJson = JSON.stringify(pipelineData);
      const formData = new FormData();
      formData.append("pipeline", pipelineJson);

      const response = await fetch(
        "https://vectorshift-backend-nkzt.onrender.com/pipelines/parse",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Show success modal
      setModalResult(result);
      setIsModalError(false);
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting pipeline:", error);

      // Show error modal
      setModalResult({ message: error.message });
      setIsModalError(true);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalResult(null);
    setIsModalError(false);
  };

  return (
    <>
      <div className="submit-button-container">
        <button
          onClick={handleSubmit}
          disabled={nodes.length === 0 || isLoading}
          className="submit-button"
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Submit Pipeline"
          )}
        </button>
      </div>
      <ResultModal
        isOpen={showModal}
        onClose={closeModal}
        result={modalResult}
        isError={isModalError}
      />
    </>
  );
};
