// components/DecisionNode.tsx
import React from "react";
import { Handle, Position } from "@xyflow/react";

const DecisionNode = ({ id, data }: any) => {
  return (
    <div
      style={{
        background: "#ffdfba",
        border: "1px solid orange",
        borderRadius: 5,
        padding: 10,
        width: 220,
        textAlign: "center",
        fontSize: 12,
      }}
    >
      <strong>{data.label}</strong>
      <div style={{ marginTop: 10 }}>
        {data.options?.map((option: string) => (
          <button
            key={option}
            onClick={() => data.onSelect(id, option)}
            style={{
              margin: "4px",
              padding: "4px 8px",
              fontSize: 11,
              cursor: "pointer",
              borderRadius: 4,
              border: "1px solid #888",
              background: "#fff",
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default DecisionNode;
