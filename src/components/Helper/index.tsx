import React, { useState, useCallback, useRef } from "react";
import Link from "@docusaurus/Link";

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
  useReactFlow,
  ReactFlowProvider,
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
          position: { x: 420, y: verticalSpacing - 200 },
          data: { label: "Collect raw dataset" },
          style: styles.startNode,
          sourcePosition: Position.Bottom,
          draggable: true,
        },
        {
          id: "analysisType",
          type: "decision",
          position: { x: 400, y: verticalSpacing - 100 },
          data: {
            label: "What type of analysis are you performing?",
          },
          targetPosition: Position.Top,
          sourcePosition: Position.Bottom,
          draggable: true,
        },
        {
          id: "rnaseqDataSize",
          position: { x: 400 - horizontalSpacing, y: verticalSpacing * 2 },
          data: { label: "Raw data size < 10TB?" },
          style: styles.decisionNode,
          targetPosition: Position.Top,
          sourcePosition: Position.Bottom,
          draggable: true,
        },
        {
          id: "ontGpuRequired",
          position: { x: 300 + horizontalSpacing, y: verticalSpacing * 2 },
          data: { label: "GPU required for basecalling or downstream?" },
          style: styles.decisionNode,
          targetPosition: Position.Top,
          sourcePosition: Position.Bottom,
          draggable: true,
        },
        {
          id: "gpuAcceleration",
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
          data: { label: "NUS Vanda" },
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
          data: { label: "NUS Vanda" },
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
          data: { label: "NUS Hopper" },
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
          data: { label: "NUS Hopper" },
          style: styles.serviceNode,
          targetPosition: Position.Top,
          draggable: true,
        },
        {
          id: "aspire2a",
          position: { x: 450 - horizontalSpacing, y: verticalSpacing * 4.5 },
          data: { label: "NSCC ASPIRE2A" },
          style: styles.aspireNode,
          targetPosition: Position.Top,
          draggable: true,
        },
        {
          id: "dnaDataSize",
          position: { x: 800 + horizontalSpacing, y: verticalSpacing * 2 },
          data: { label: "Raw data size < 10TB?" },
          style: styles.decisionNode,
          targetPosition: Position.Top,
          sourcePosition: Position.Bottom,
          draggable: true,
        },
        {
          id: "nusVandaVariantCalling",
          position: {
            x: 600 + horizontalSpacing * 1.5,
            y: verticalSpacing * 3.5,
          },
          data: { label: "NUS Vanda" },
          style: styles.serviceNode,
          targetPosition: Position.Top,
          draggable: true,
        },
        {
          id: "nsccAspire2aVariantCalling",
          position: { x: 1000 + horizontalSpacing, y: verticalSpacing * 3.5 },
          data: { label: "NSCC ASPIRE2A" },
          style: styles.aspireNode,
          targetPosition: Position.Top,
          draggable: true,
        },
      ],
      edges: [
        { id: "e-start-analysisType", source: "start", target: "analysisType" },
        {
          id: "e-analysisType-rnaseqDataSize",
          source: "analysisType",
          target: "rnaseqDataSize",
          label: "RNASeq",
        },
        {
          id: "e-analysisType-ontGpuRequired",
          source: "analysisType",
          target: "ontGpuRequired",
          label: "ONT",
        },
        {
          id: "e-analysisType-dnaDataSize",
          source: "analysisType",
          target: "dnaDataSize",
          label: "DNA Sequencing/ Variant Calling",
        },
        {
          id: "e-rnaseqDataSize-nusVanda1",
          source: "rnaseqDataSize",
          target: "nusVanda1",
          label: "Yes",
        },
        {
          id: "e-rnaseqDataSize-gpuAcceleration",
          source: "rnaseqDataSize",
          target: "gpuAcceleration",
          label: "No",
        },
        {
          id: "e-gpuAcceleration-nusHopper1",
          source: "gpuAcceleration",
          target: "nusHopper1",
          label: "Yes",
        },
        {
          id: "e-gpuAcceleration-aspire2a",
          source: "gpuAcceleration",
          target: "aspire2a",
          label: "No",
        },
        {
          id: "e-ontGpuRequired-nusHopper2",
          source: "ontGpuRequired",
          target: "nusHopper2",
          label: "Yes",
        },
        {
          id: "e-ontGpuRequired-nusVanda2",
          source: "ontGpuRequired",
          target: "nusVanda2",
          label: "No",
        },
        {
          id: "e-dnaDataSize-nusVandaVariantCalling",
          source: "dnaDataSize",
          target: "nusVandaVariantCalling",
          label: "Yes",
        },
        {
          id: "e-dnaDataSize-nsccAspire2aVariantCalling",
          source: "dnaDataSize",
          target: "nsccAspire2aVariantCalling",
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

const FlowChart = ({
  nodes,
  edges,
  nodeTypes,
  onNodesChange,
  onEdgesChange,
  activeQuestions,
  answers,
  answerToEdgeMap,
  questionModel,
}) => {
  const { setCenter } = useReactFlow();

  // Optionally, add useEffect here to zoom to the latest active question node
  React.useEffect(() => {
    // Combine active-question nodes with any nodes connected by selected edges
    const selectedEdges = edges.filter((edge) =>
      Object.values(answers).some((ans) => answerToEdgeMap[ans] === edge.id)
    );

    const relevantNodes = new Set<Node>();

    // Include nodes for each selected edge
    selectedEdges.forEach((edge) => {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      const targetNode = nodes.find((n) => n.id === edge.target);
      if (sourceNode) relevantNodes.add(sourceNode);
      if (targetNode) relevantNodes.add(targetNode);
    });

    // Include all nodes that match activeQuestions
    activeQuestions.forEach((key) => {
      const node = nodes.find((n) => n.id === key);
      if (node) relevantNodes.add(node);
    });

    const relevantArray = Array.from(relevantNodes);
    if (relevantArray.length > 0 && setCenter) {
      const minX = Math.min(...relevantArray.map((n) => n.position.x));
      const minY = Math.min(...relevantArray.map((n) => n.position.y));
      const maxX = Math.max(
        ...relevantArray.map((n) => n.position.x + (n.width || 180))
      );
      const maxY = Math.max(
        ...relevantArray.map((n) => n.position.y + (n.height || 40))
      );

      setCenter((minX + maxX) / 2, (minY + maxY + 100) / 2, {
        zoom: 1,
        duration: 600,
        fitView: true,
        padding: 0.2,
      });
    }
  }, [activeQuestions, answers, edges, nodes, answerToEdgeMap, setCenter]);

  return (
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
  );
};

const FlowHelper: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(flowConfigs.all.nodes);
  const [edges, setEdges] = useState<Edge[]>(flowConfigs.all.edges);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeQuestions, setActiveQuestions] = useState<string[]>([
    "analysisType",
  ]); // Track active questions
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Define the question model
  const questionModel: Record<
    string,
    { question: string; options: string[]; next: Record<string, string | null> }
  > = {
    analysisType: {
      question: "What type of analysis are you performing?",
      options: ["RNASeq", "ONT", "DNA Sequencing/Variant Calling"],
      next: {
        RNASeq: "rnaseq_dataSize",
        ONT: "ont_gpuRequired",
        "DNA Sequencing/Variant Calling": "dna_dataSize",
      },
    },
    rnaseq_dataSize: {
      question: "Raw data size < 10 TB?",
      options: ["rnaseq10TB_Yes", "rnaseq10TB_No"],
      next: {
        rnaseq10TB_Yes: null, // End of flow
        rnaseq10TB_No: "gpuAcceleration",
      },
    },
    dna_dataSize: {
      question: "Raw data size < 10 TB?",
      options: ["dna10TB_Yes", "dna10TB_No"],
      next: {
        dna10TB_Yes: null, // End of flow
        dna10TB_No: null,
      },
    },
    ont_gpuRequired: {
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
    RNASeq: "e-analysisType-rnaseqDataSize",
    ONT: "e-analysisType-ontGpuRequired",
    "DNA Sequencing/Variant Calling": "e-analysisType-dnaDataSize",
    rnaseq10TB_Yes: "e-rnaseqDataSize-nusVanda1",
    rnaseq10TB_No: "e-rnaseqDataSize-gpuAcceleration",
    dna10TB_Yes: "e-dnaDataSize-nusVandaVariantCalling",
    dna10TB_No: "e-dnaDataSize-nsccAspire2aVariantCalling",
    "GPU-Yes": "e-ontGpuRequired-nusHopper2",
    "GPU-No": "e-ontGpuRequired-nusVanda2",
    "HeavyGPU-Yes": "e-gpuAcceleration-nusHopper1",
    "HeavyGPU-No": "e-gpuAcceleration-aspire2a",
  };

  const resourceSuggestionMap: Record<string, { name: string; link: string }> =
    {
      rnaseq10TB_Yes: {
        name: "NUS Vanda",
        link: "/content/compute-resources#nus-vanda--high-throughput-computing-htc-cluster",
      },
      rnaseq10TB_No: {
        name: "See GPU/NSCC resources",
        link: "/content/compute-resources",
      },
      dna10TB_Yes: {
        name: "NUS Vanda",
        link: "/content/compute-resources#nus-vanda--high-throughput-computing-htc-cluster",
      },
      dna10TB_No: {
        name: "NSCC ASPIRE2A",
        link: "/content/compute-resources#nscc-aspire2a--national-supercomputing-resource",
      },
      "GPU-Yes": {
        name: "NUS Hopper",
        link: "/content/compute-resources#nus-hopper--ai-optimized-high-performance-cluster",
      },
      "GPU-No": {
        name: "NUS Vanda",
        link: "/content/compute-resources#nus-vanda--high-throughput-computing-htc-cluster",
      },
      "HeavyGPU-Yes": {
        name: "NUS Hopper",
        link: "/content/compute-resources#nus-hopper--ai-optimized-high-performance-cluster",
      },
      "HeavyGPU-No": {
        name: "NSCC ASPIRE2A",
        link: "/content/compute-resources#nscc-aspire2a--national-supercomputing-resource",
      },
    };

  const resourceDescriptionMap: Record<string, string> = {
    "NUS Vanda": `
        This platform is built to handle general scientific tasks and works especially well for analyzing genomic data..
    `,
    "NUS Hopper": `
      For AI-driven research, NUS Hopper provides cutting-edge hardware tailored to deep learning and computational biology workflows.
    `,
    "NSCC ASPIRE2A": `
      NSCC's ASPIRE2A supercomputer delivers advanced capabilities for high-performance computing, providing a balanced environment for intensive computational research.
    `,
  };

  const popupContentMap: Record<string, { content: string }> = {
    "DNA Sequencing/Variant Calling": {
      content:
        "GeDAC has implemented a DNA sequencing workflow based on the <a style='color: #3182ce; font-weight: 600;' href='https://docs.gdc.cancer.gov/Data/Bioinformatics_Pipelines/DNA_Seq_Variant_Calling_Pipeline/' target='blank'>GDC Pipeline specification</a>, enabling harmonization and analysis of raw genomic samples.<br/><br/> For further details or access, please contact <a style='color: #3182ce; font-weight: 600;' href='/Contact' target='blank'>GeDaC Support</a>.",
    },
    RNASeq: {
      content:
        "GeDAC has setup a cloud runner to run <a style='color: #3182ce; font-weight: 600;' href='https://nf-co.re/rnaseq/3.14.0/' target='blank'>Nextflow RNAseq Pipeline</a>, supported by a scalable environment that handles high data volumes efficiently.<br/><br/> For further details or access, please feel free to visit <a style='color: #3182ce; font-weight: 600;' href='https://www.cloudflow.gedac.org/' target='blank'>Cloudflow</a> and contact <a style='color: #3182ce; font-weight: 600;' href='/Contact' target='blank'>GeDaC Support</a>.",
    },
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

  // Find the last answered question and its answer
  const lastQuestionKey = activeQuestions[activeQuestions.length - 1];
  const lastAnswer = answers[lastQuestionKey];

  // Check if this is an end node (no next question)
  const isEnd =
    lastQuestionKey &&
    lastAnswer &&
    questionModel[lastQuestionKey]?.next[lastAnswer] === null;

  return (
    <ChakraProvider theme={theme}>
      <Flex height="100vh" overflow="hidden">
        {/* Drawer Section */}
        <Box
          width={isDrawerOpen ? "450px" : "50px"}
          transition="width 0.3s"
          bg="gray.100"
          borderRight="1px solid #ccc"
          position="relative"
          overflowY="auto"
          maxH="100vh"
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
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                Computing Resource Selection Guide
              </Text>
              <Box borderBottom="1px" borderColor="gray.300" mb={2} />

              {activeQuestions.map((questionKey) => (
                <Box key={questionKey} p={2}>
                  <Text fontWeight="semibold" mb={1}>
                    {questionModel[questionKey].question}
                  </Text>
                  <RadioGroup
                    onChange={(value) => updateFlow(questionKey, value)}
                    value={answers[questionKey] || ""}
                  >
                    <Stack spacing={0.1} bg="white" pl={4}>
                      {questionModel[questionKey].options.map((option) => {
                        const displayText =
                          option.includes("-") || option.includes("_")
                            ? option.split(/[-_]/)[1]
                            : option;
                        return (
                          <Radio
                            key={option}
                            value={option}
                            display="flex"
                            alignItems="center"
                          >
                            <Text ml={1} pt={3}>
                              {displayText}
                            </Text>
                          </Radio>
                        );
                      })}
                    </Stack>
                  </RadioGroup>
                  {popupContentMap[answers[questionKey]] && (
                    <Box
                      mt={4}
                      mb={2}
                      p={4}
                      bg="gray.50"
                      borderRadius="md"
                      border="1px solid #CBD5E1"
                    >
                      <Box
                        fontSize="xs"
                        fontStyle="italic"
                        color="gray.700"
                        dangerouslySetInnerHTML={{
                          __html: popupContentMap[answers[questionKey]].content,
                        }}
                      />
                    </Box>
                  )}
                </Box>
              ))}

              {isEnd && resourceSuggestionMap[lastAnswer] && (
                <Box
                  mt={6}
                  mb={2}
                  p={4}
                  bg="blue.50"
                  borderRadius="md"
                  border="1px solid #3182ce"
                >
                  <Text fontWeight="bold" color="blue.700" mb={2}>
                    Suggested Resource:
                  </Text>
                  <Link
                    to={resourceSuggestionMap[lastAnswer].link}
                    style={{ color: "#3182ce", textDecoration: "underline" }}
                  >
                    {resourceSuggestionMap[lastAnswer].name}
                  </Link>
                  <Box
                    mt={2}
                    color="gray.700"
                    fontSize="sm"
                    dangerouslySetInnerHTML={{
                      __html:
                        resourceDescriptionMap[
                          resourceSuggestionMap[lastAnswer].name
                        ],
                    }}
                  />
                </Box>
              )}
              {isEnd && (
                <Box
                  mt={4}
                  p={4}
                  bg="green.50"
                  borderRadius="md"
                  border="1px solid #38A169"
                >
                  <Text fontSize="sm" color="gray.700" mb={2}>
                    <b>Note:</b> When choosing a resource, it's important to
                    consider several factors such as <b>cost</b>,{" "}
                    <b>data size</b>, <b>turnaround time</b>, and{" "}
                    <b>GPU availability</b>.
                    <br />
                    <br />
                    If you'd like help planning or selecting the right resources
                    for your project, please{" "}
                    <Link
                      to="/Contact"
                      style={{ color: "#3182ce", textDecoration: "underline" }}
                    >
                      contact the GeDAC team
                    </Link>
                    .
                  </Text>
                </Box>
              )}

              <Button mt={6} colorScheme="red" onClick={resetFlow}>
                Reset Flow
              </Button>
            </Box>
          )}
        </Box>

        {/* Main Content Section */}

        <Box flex="1" bg="white" ref={reactFlowWrapper}>
          <ReactFlowProvider>
            <FlowChart
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              activeQuestions={activeQuestions}
              answers={answers}
              answerToEdgeMap={answerToEdgeMap}
              questionModel={questionModel}
            />
          </ReactFlowProvider>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default FlowHelper;
