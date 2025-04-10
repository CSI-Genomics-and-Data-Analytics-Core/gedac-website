import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  MarkerType,
  Position,
  Node,
  Edge,
  NodeTypes,
  OnNodesChange,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  OnEdgesChange,
  applyEdgeChanges,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import DecisionNode from "./DecisionNode";

// TypeScript interfaces
interface NodeStyle {
  padding: number;
  borderRadius: number;
  fontSize: number;
  width: number;
  textAlign: string;
  background: string;
  border: string;
}

interface FlowConfig {
  title: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}

// Define custom node types
const nodeTypes: NodeTypes = {
  decision: DecisionNode,
};

// Define reusable node styles
const baseNodeStyle = {
  padding: 10,
  borderRadius: 5,
  fontSize: 12,
  width: 180,
  textAlign: "center",
};

const styles = {
  startNode: {
    ...baseNodeStyle,
    background: "#d0f0c0", // Light green
    border: "1px solid green",
  },
  serviceNode: {
    ...baseNodeStyle,
    background: "#bae1ff", // Light blue
    border: "1px solid blue",
  },
  decisionNode: {
    ...baseNodeStyle,
    background: "#ffdfba", // Light orange
    border: "1px solid orange",
    width: 200,
  },
  aspireNode: {
    ...baseNodeStyle,
    background: "#e6ccff", // Light purple
    border: "1px solid purple",
  },
};

// Improved node spacing
const createFlowConfig = (): Record<string, FlowConfig> => {
  const horizontalSpacing = 250;
  const verticalSpacing = 150;
  
  const configs: Record<string, FlowConfig> = {
    all: {
      title: "Data Analysis Workflow",
      description:
        "Select the appropriate resources based on your data and analysis requirements.",
      nodes: [
        {
          id: "start",
          type: "input",
          position: { x: 400, y: 0 },
          data: { label: "Collect raw dataset" },
          style: styles.startNode,
          sourcePosition: Position.Bottom,
          draggable: true,
        },
        {
          id: "decision1",
          type: "decision",
          position: { x: 400, y: verticalSpacing },
          data: {
            label: "What type of analysis are you performing?",
            options: ["RNASeq", "ONT"],
          },
          targetPosition: Position.Top,
          sourcePosition: Position.Bottom,
          draggable: true,
        },
        {
          id: "decision2",
          position: { x: 400 - horizontalSpacing, y: verticalSpacing * 2 },
          data: { label: "Raw data size < 10TB?" },
          style: styles.decisionNode,
          targetPosition: Position.Top,
          sourcePosition: Position.Bottom,
          draggable: true,
        },
        {
          id: "decision3",
          position: { x: 400 + horizontalSpacing, y: verticalSpacing * 2 },
          data: { label: "GPU required for basecalling or downstream?" },
          style: styles.decisionNode,
          targetPosition: Position.Top,
          sourcePosition: Position.Bottom,
          draggable: true,
        },
        {
          id: "decision4",
          position: { x: 400 - horizontalSpacing, y: verticalSpacing * 3 },
          data: { label: "Does your workflow involve heavy GPU acceleration?" },
          style: styles.decisionNode,
          targetPosition: Position.Top,
          sourcePosition: Position.Bottom,
          draggable: true,
        },
        {
          id: "nusVanda1",
          position: { x: 400 - horizontalSpacing * 1.5, y: verticalSpacing * 4 },
          data: { label: "Use NUS Vanda" },
          style: styles.serviceNode,
          targetPosition: Position.Top,
          draggable: true,
        },
        {
          id: "nusVanda2",
          position: { x: 400 + horizontalSpacing * 1.5, y: verticalSpacing * 3 },
          data: { label: "Use NUS Vanda" },
          style: styles.serviceNode,
          targetPosition: Position.Top,
          draggable: true,
        },
        {
          id: "nusHopper1",
          position: { x: 400 - horizontalSpacing * 0.5, y: verticalSpacing * 4 },
          data: { label: "Use NUS Hopper" },
          style: styles.serviceNode,
          targetPosition: Position.Top,
          draggable: true,
        },
        {
          id: "nusHopper2",
          position: { x: 400 + horizontalSpacing * 0.5, y: verticalSpacing * 3 },
          data: { label: "Use NUS Hopper" },
          style: styles.serviceNode,
          targetPosition: Position.Top,
          draggable: true,
        },
        {
          id: "aspire2a",
          position: { x: 400 - horizontalSpacing, y: verticalSpacing * 5 },
          data: { label: "Use NSCC ASPIRE2A" },
          style: styles.aspireNode,
          targetPosition: Position.Top,
          draggable: true,
        },
      ],
      edges: [
        { id: "e-start-decision1", source: "start", target: "decision1" },
        {
          id: "e-decision1-decision2",
          source: "decision1",
          target: "decision2",
          label: "RNASeq",
        },
        {
          id: "e-decision1-decision3",
          source: "decision1",
          target: "decision3",
          label: "ONT",
        },
        {
          id: "e-decision2-nusVanda1",
          source: "decision2",
          target: "nusVanda1",
          label: "Yes",
        },
        {
          id: "e-decision2-decision4",
          source: "decision2",
          target: "decision4",
          label: "No",
        },
        {
          id: "e-decision4-nusHopper1",
          source: "decision4",
          target: "nusHopper1",
          label: "Yes",
        },
        {
          id: "e-decision4-aspire2a",
          source: "decision4",
          target: "aspire2a",
          label: "No",
        },
        {
          id: "e-decision3-nusHopper2",
          source: "decision3",
          target: "nusHopper2",
          label: "Yes",
        },
        {
          id: "e-decision3-nusVanda2",
          source: "decision3",
          target: "nusVanda2",
          label: "No",
        },
      ],
    },
  };

  // Add markers and styles to edges
  Object.keys(configs).forEach((key) => {
    configs[key].edges = configs[key].edges.map((edge) => ({
      ...edge,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { strokeWidth: 1.5, stroke: "#000" },
      labelStyle: { fill: "#000", fontWeight: 700 },
      labelBgStyle: { fill: "#fff", stroke: "#000", borderRadius: 4, padding: 5 },
    }));
  });

  return configs;
};

const flowConfigs = createFlowConfig();

const FlowHelper: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(flowConfigs.all.nodes);
  const [edges, setEdges] = useState<Edge[]>(flowConfigs.all.edges);
  
  // Handle node position changes (dragging)
  const onNodesChange: OnNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Handle edge changes
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Function to update flow based on selected decision paths
  const updateFlow = useCallback((selectedNodeId: string, decision: string) => {
    // Implementation for decision path filtering logic
    const updatedNodes = flowConfigs.all.nodes.filter((node) => {
      if (node.id === selectedNodeId) return true;
      if (node.id.startsWith(decision)) return true;
      return false;
    });

    const updatedEdges = flowConfigs.all.edges.filter((edge) => {
      if (edge.source === selectedNodeId && edge.label === decision)
        return true;
      if (updatedNodes.some((node) => node.id === edge.target)) return true;
      return false;
    });

    setNodes(updatedNodes);
    setEdges(updatedEdges);
  }, []);

  return (
    <div style={{ width: "100%", height: "80vh", border: "1px solid #ccc" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        minZoom={0.5}
        maxZoom={1.5}
        attributionPosition="bottom-left"
      >
        <Controls />
        <Background variant="none" gap={12} size={1} />

      </ReactFlow>
    </div>
  );
};

export default FlowHelper;