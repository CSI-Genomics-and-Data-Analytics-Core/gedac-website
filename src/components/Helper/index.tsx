import React, { useState, useCallback } from "react";
import {
  Box,
  Text,
  RadioGroup,
  Radio,
  Stack,
  Flex,
  IconButton,
  ChakraProvider,
  extendTheme,
  Button,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import React Icons
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
          position: { x: 420, y: 0 },
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
          position: { x: 500 - horizontalSpacing, y: verticalSpacing * 3 },
          data: { label: "Does your workflow involve heavy GPU acceleration?" },
          style: styles.decisionNode,
          targetPosition: Position.Top,
          sourcePosition: Position.Bottom,
          draggable: true,
        },
        {
          id: "nusVanda1",
          position: {
            x: 400 - horizontalSpacing * 1.5,
            y: verticalSpacing * 4,
          },
          data: { label: "Use NUS Vanda" },
          style: styles.serviceNode,
          targetPosition: Position.Top,
          draggable: true,
        },
        {
          id: "nusVanda2",
          position: {
            x: 400 + horizontalSpacing * 1.5,
            y: verticalSpacing * 3,
          },
          data: { label: "Use NUS Vanda" },
          style: styles.serviceNode,
          targetPosition: Position.Top,
          draggable: true,
        },
        {
          id: "nusHopper1",
          position: {
            x: 500 - horizontalSpacing * 0.5,
            y: verticalSpacing * 4,
          },
          data: { label: "Use NUS Hopper" },
          style: styles.serviceNode,
          targetPosition: Position.Top,
          draggable: true,
        },
        {
          id: "nusHopper2",
          position: {
            x: 400 + horizontalSpacing * 0.5,
            y: verticalSpacing * 3,
          },
          data: { label: "Use NUS Hopper" },
          style: styles.serviceNode,
          targetPosition: Position.Top,
          draggable: true,
        },
        {
          id: "aspire2a",
          position: { x: 450 - horizontalSpacing, y: verticalSpacing * 4.5 },
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
      labelBgStyle: {
        fill: "#fff",
        stroke: "#000",
        borderRadius: 4,
        padding: 5,
      },
    }));
  });

  return configs;
};

const flowConfigs = createFlowConfig();
const FlowHelper: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(flowConfigs.all.nodes);
  const [edges, setEdges] = useState<Edge[]>(flowConfigs.all.edges);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeQuestions, setActiveQuestions] = useState<string[]>([
    "analysisType",
  ]); // Track active questions

  // Define the question model
  const questionModel: Record<
    string,
    { question: string; options: string[]; next: Record<string, string | null> }
  > = {
    analysisType: {
      question: "What type of analysis are you performing?",
      options: ["RNASeq", "ONT"],
      next: {
        RNASeq: "dataSize",
        ONT: "gpuRequired",
      },
    },
    dataSize: {
      question: "Raw data size < 10 TB?",
      options: ["10TB-Yes", "10TB-No"],
      next: {
        "10TB-Yes": null, // End of flow
        "10TB-No": "gpuAcceleration",
      },
    },
    gpuRequired: {
      question: "GPU required for basecalling or downstream?",
      options: ["GPU-Yes", "GPU-No"],
      next: {
        "GPU-Yes": null, // End of flow
        "GPU-No": null, // End of flow
      },
    },
    gpuAcceleration: {
      question: "Does your workflow involve heavy GPU acceleration?",
      options: ["HeavyGPU-Yes", "HeavyGPU-No"],
      next: {
        "HeavyGPU-Yes": null, // End of flow
        "HeavyGPU-No": null, // End of flow
      },
    },
  };

  // Mapping of answers to individual edge IDs
  const answerToEdgeMap: Record<string, string> = {
    RNASeq: "e-decision1-decision2",
    ONT: "e-decision1-decision3",
    "10TB-Yes": "e-decision2-nusVanda1",
    "10TB-No": "e-decision2-decision4",
    "GPU-Yes": "e-decision3-nusHopper2",
    "GPU-No": "e-decision3-nusVanda2",
    "HeavyGPU-Yes": "e-decision4-nusHopper1",
    "HeavyGPU-No": "e-decision4-aspire2a",
  };

  // Handle node position changes (dragging)
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Toggle drawer open/collapse
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const updateFlow = (questionKey: string, answer: string) => {
    const updatedAnswers = { ...answers, [questionKey]: answer };

    // Reset subsequent answers and active questions
    const questionKeys = Object.keys(updatedAnswers);
    const currentQuestionIndex = questionKeys.indexOf(questionKey);

    // Remove answers and questions after the current question
    questionKeys.slice(currentQuestionIndex + 1).forEach((key) => {
      delete updatedAnswers[key];
    });

    setAnswers(updatedAnswers);

    // Update active questions based on the current flow
    const newActiveQuestions = questionKeys.slice(0, currentQuestionIndex + 1);
    const nextQuestionKey = questionModel[questionKey].next[answer];
    if (nextQuestionKey) {
      newActiveQuestions.push(nextQuestionKey);
    }
    setActiveQuestions(newActiveQuestions);

    // Highlight all edges corresponding to the current and previous answers
    // Highlight all edges corresponding to the current and previous answers
    setEdges((prevEdges) =>
      prevEdges.map((edge) => {
        const isSelected = Object.values(updatedAnswers).some(
          (ans) => answerToEdgeMap[ans] === edge.id
        );
        return {
          ...edge,
          style: {
            ...edge.style,
            stroke: isSelected ? "#3182ce" : "#CBD5E1", // blue-600 for selected, slate-200 for default
            strokeWidth: isSelected ? 4 : 1.5,
            opacity: isSelected ? 1 : 0.5,
            transition: "stroke 0.2s, stroke-width 0.2s, opacity 0.2s",
          },
          className: isSelected ? "selected-edge" : "",
          labelStyle: {
            ...edge.labelStyle,
            fill: isSelected ? "#3182ce" : "#222",
            fontWeight: isSelected ? 900 : 700,
          },
          labelBgStyle: {
            ...edge.labelBgStyle,
            fill: isSelected ? "#E3F2FD" : "#fff", // blue-50 for selected
            stroke: isSelected ? "#3182ce" : "#CBD5E1",
          },
        };
      })
    );

    // Highlight the node corresponding to the current answer
    setNodes((prevNodes) =>
      prevNodes.map((node) => ({
        ...node,
        style: {
          ...node.style,
          border: Object.values(updatedAnswers).includes(
            String(node.data.label)
          )
            ? "2px solid red"
            : node.style?.border || "",
        },
      }))
    );
  };

  // Reset the entire flow
  const resetFlow = () => {
    setAnswers({});
    setActiveQuestions(["analysisType"]); // Reset to the first question
    setEdges((prevEdges) =>
      prevEdges.map((edge) => ({
        ...edge,
        style: { stroke: "#000", strokeWidth: 1.5 },
      }))
    );
    setNodes((prevNodes) =>
      prevNodes.map((node) => ({
        ...node,
        style: { ...node.style, border: "" },
      }))
    );
  };

  const theme = extendTheme({
    styles: {
      global: {
        ":where(img, svg, video, canvas, audio, iframe, embed, object)": {
          display: "inline",
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Flex height="100vh" overflow="hidden">
        {/* Drawer Section */}
        <Box
          width={isDrawerOpen ? "400px" : "50px"}
          transition="width 0.3s"
          bg="gray.100"
          borderRight="1px solid #ccc"
          position="relative"
        >
          <IconButton
            aria-label="Toggle Drawer"
            icon={isDrawerOpen ? <FaChevronLeft /> : <FaChevronRight />}
            size="sm"
            position="absolute"
            top="10px"
            right="-20px"
            onClick={toggleDrawer}
            bg="white"
            border="1px solid #ccc"
            borderRadius="full"
            zIndex={1}
          />
          {isDrawerOpen && (
            <Box p={4}>
              <h1>Computing Resource Selection Guide</h1>
              <hr className="margin-top--lg margin-bottom--lg" />

              {activeQuestions.map((questionKey) => (
                <Box key={questionKey} mt={4}>
                  <Text mb={2}>{questionModel[questionKey].question}</Text>
                  <RadioGroup
                    onChange={(value) => updateFlow(questionKey, value)}
                    value={answers[questionKey] || ""}
                  >
                    <Stack direction="column">
                      {questionModel[questionKey].options.map((option) => {
                        const displayText = option.includes("-")
                          ? option.split("-")[1]
                          : option;
                        return (
                          <Radio key={option} value={option}>
                            {displayText}
                          </Radio>
                        );
                      })}
                    </Stack>
                  </RadioGroup>
                </Box>
              ))}

              <Button mt={6} colorScheme="red" onClick={resetFlow}>
                Reset Flow
              </Button>
            </Box>
          )}
        </Box>

        {/* Main Content Section */}
        <Box flex="1" bg="white">
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
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default FlowHelper;
