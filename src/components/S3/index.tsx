import React, { useState, useEffect, useCallback } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Tooltip as ChartToolTip,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
  ChartToolTip
);

import {
  FaDollarSign,
  FaFolderOpen,
  FaDna,
  FaExchangeAlt,
} from "react-icons/fa";
import { Pie, Bar } from "react-chartjs-2";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  RadioGroup,
  Radio,
  Select,
  Slider,
  Stack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ChakraProvider,
  HStack,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  extendTheme,
} from "@chakra-ui/react";

// Constants
const KB_IN_GB = 1048576;
const GB_IN_TB = 1024;

// AWS pricing information
const TIER1_THRESHOLD_GB = 51200;  // 50 TB in GB
const TIER2_THRESHOLD_GB = 512000; // 500 TB in GB
const TIER1_RATE = 0.025; // $0.025 per GB for first 50 TB
const TIER2_RATE = 0.024; // $0.024 per GB for 50-500 TB
const TIER3_RATE = 0.023; // $0.023 per GB beyond 500 TB

const STANDARD_STORAGE_COST_GB = 0.025;
const DATA_TRANSFER_OUT_COST = 0.09;
const PUT_POST_COPY_LIST_REQUEST_COST = 0.000005;
const GET_SELECT_1000_REQUEST_COST = 0.0004;
const GET_SELECT_REQUEST_COST = 0.0000004;
const DEEP_ARCHIVE_STORAGE_COST_GB = 0.002;
const DEEP_ARCHIVE_RETRIEVAL_COST_GB = 0.02;
const DEEP_ARCHIVE_REQUEST_COST = 0.0000025;

// Sample NGS details data
const NGS_DETAILS = [
  {
    "Sequencing Type": "Human WGS",
    "Coverage/Read Details": "30x coverage, 150 bp paired-end reads",
    "Data Size": "~100-200 GB per sample",
  },
  {
    "Sequencing Type": "Human WES",
    "Coverage/Read Details": "100x coverage, 150 bp paired-end reads",
    "Data Size": "~10-20 GB per sample",
  },
  {
    "Sequencing Type": "RNA-Seq",
    "Coverage/Read Details": "50 million reads, 100 bp paired-end",
    "Data Size": "~5-10 GB per sample",
  },
  {
    "Sequencing Type": "Targeted Sequencing",
    "Coverage/Read Details": "E.g., 100 genes, 500x coverage",
    "Data Size": "~1-5 GB per sample",
  },
  {
    "Sequencing Type": "ChIP-Seq",
    "Coverage/Read Details": "20 million reads, 75 bp single-end",
    "Data Size": "~1-2 GB per sample",
  },
  {
    "Sequencing Type": "scRNA-Seq",
    "Coverage/Read Details": "10,000 cells, 50,000 reads per cell",
    "Data Size": "~50-100 GB in total",
  },
  {
    "Sequencing Type": "Metagenomic Sequencing (Shotgun)",
    "Coverage/Read Details": "10 million reads, 150 bp paired-end",
    "Data Size": "~10-20 GB per sample",
  },
  {
    "Sequencing Type": "ATAC-Seq",
    "Coverage/Read Details": "50,000 cells, 75 bp paired-end",
    "Data Size": "~2-5 GB per sample",
  },
  {
    "Sequencing Type": "Hi-C Sequencing",
    "Coverage/Read Details": "5 million reads, 150 bp paired-end",
    "Data Size": "~10-20 GB per sample",
  },
  {
    "Sequencing Type": "Long-read Sequencing (PacBio or Nanopore)",
    "Coverage/Read Details": "30x coverage",
    "Data Size": "~300-500 GB per sample",
  },
  {
    "Sequencing Type": "Single-cell ATAC-Seq",
    "Coverage/Read Details": "10,000 cells, 50,000 reads per cell",
    "Data Size": "~50-100 GB in total",
  },
  {
    "Sequencing Type": "TCR/BCR Sequencing (immune repertoire)",
    "Coverage/Read Details": "10,000 sequences",
    "Data Size": "~1-2 GB per sample",
  },
  {
    "Sequencing Type": "Microbiome 16S rRNA Sequencing",
    "Coverage/Read Details": "10,000 reads per sample",
    "Data Size": "~0.5-1 GB per sample",
  },
  {
    "Sequencing Type": "Exome Capture Sequencing",
    "Coverage/Read Details": "gene panel, 500 genes, 1000x coverage",
    "Data Size": "~5-10 GB per sample",
  },
  {
    "Sequencing Type": "Small RNA-Seq",
    "Coverage/Read Details": "10 million reads, 50 bp single-end",
    "Data Size": "~0.5-1 GB per sample",
  },
  {
    "Sequencing Type": "Methylation Array (e.g., Illumina 450K)",
    "Coverage/Read Details": "N/A",
    "Data Size": "~1-2 GB per sample",
  },
  {
    "Sequencing Type": "Spatial Transcriptomics",
    "Coverage/Read Details": "1 slide, 1 million reads, 100 bp paired-end",
    "Data Size": "~5-10 GB per slide",
  },
  {
    "Sequencing Type": "Epigenetic Sequencing (e.g., Bisulfite-Seq)",
    "Coverage/Read Details": "whole genome, 30x coverage",
    "Data Size": "~100-150 GB per sample",
  },
];

const S3CostCalculator: React.FC = () => {
  // State variables
  const [mode, setMode] = useState<string>("Simple");
  const [currency, setCurrency] = useState<string>("USD");
  const [storageClass, setStorageClass] = useState<string>("Standard Storage");
  const [totalMonths, setTotalMonths] = useState<number>(1);

  // Simple mode inputs
  const [sSamples, setSSamples] = useState<number>(0);
  const [sSize, setSSize] = useState<number>(0);
  const [sDuration, setSDuration] = useState<number>(1);
  const [sDownload, setSDownload] = useState<number>(0);
  const [sDownloadTimes, setSDownloadTimes] = useState<number>(0);
  const [sDownloadSamples, setSDownloadSamples] = useState<number>(0);

  // Advanced mode inputs
  const [aSamples, setASamples] = useState<number>(0);
  const [aSampleAvgSize, setASampleAvgSize] = useState<number>(0);
  const [aDuration, setADuration] = useState<number[]>([6, 12]);

  // Results
  const [totalCost, setTotalCost] = useState<number>(0);
  const [storageCost, setStorageCost] = useState<number>(0);
  const [downloadCost, setDownloadCost] = useState<number>(0);
  const [costBreakdown, setCostBreakdown] = useState<string[]>([]);
  const [storageCostDistribution, setStorageCostDistribution] = useState<any[]>(
    []
  );

  // Modal controls
  const {
    isOpen: isCostModalOpen,
    onOpen: onCostModalOpen,
    onClose: onCostModalClose,
  } = useDisclosure();
  const {
    isOpen: isNgsModalOpen,
    onOpen: onNgsModalOpen,
    onClose: onNgsModalClose,
  } = useDisclosure();

  // Calculate costs whenever inputs change
  useEffect(() => {
    calculateCosts();
  }, [
    mode,
    storageClass,
    sSamples,
    sSize,
    sDuration,
    sDownload,
    sDownloadTimes,
    sDownloadSamples,
    aSamples,
    aSampleAvgSize,
    aDuration,
  ]);

  // Calculate costs based on inputs
  const calculateCosts = useCallback(() => {
    let newTotalCost = 0;
    let newStorageCost = 0;
    let newDownloadCost = 0;
    let newCostBreakdown: string[] = [];
    let newStorageCostDistribution: any[] = [];

    if (mode === "Simple") {
      // Simple mode calculation
      newStorageCost = calculateStorageCost(
        storageClass,
        sSize * GB_IN_TB,
        sDuration,
        sSamples,
        1,
        newCostBreakdown
      );

      // Monthly storage cost distribution
      const monthlyStorageCost = sDuration > 0 ? newStorageCost / sDuration : 0;
      newStorageCostDistribution = Array.from(
        { length: sDuration },
        (_, i) => ({
          Month: i + 1,
          Cost: monthlyStorageCost,
        })
      );

      newDownloadCost = calculateDataTransferCost(
        storageClass,
        sDownload * GB_IN_TB,
        sDownloadSamples,
        sDownloadTimes,
        2,
        newCostBreakdown
      );
    } else {
      // Advanced mode calculation
      // Similar logic to the Python code but simplified for the skeleton
      newStorageCost = calculateAdvancedStorageCost(
        aSamples,
        aSampleAvgSize,
        aDuration[0],
        aDuration[1],
        newCostBreakdown
      );

      // Create distribution data
      newStorageCostDistribution = Array.from(
        { length: aDuration[1] },
        (_, i) => ({
          Month: i + 1,
          Cost:
            i < aDuration[0]
              ? aSamples * (i + 1) * aSampleAvgSize * STANDARD_STORAGE_COST_GB
              : aSamples *
                aDuration[0] *
                aSampleAvgSize *
                STANDARD_STORAGE_COST_GB,
        })
      );
    }

    newTotalCost = newStorageCost + newDownloadCost;
    newCostBreakdown.push(
      `Total Cost: $${newStorageCost.toFixed(2)} + $${newDownloadCost.toFixed(2)} = $${newTotalCost.toFixed(2)}`
    );

    setTotalCost(newTotalCost);
    setStorageCost(newStorageCost);
    setDownloadCost(newDownloadCost);
    setCostBreakdown(newCostBreakdown);
    setStorageCostDistribution(newStorageCostDistribution);
  }, [
    mode,
    storageClass,
    sSamples,
    sSize,
    sDuration,
    sDownload,
    sDownloadTimes,
    sDownloadSamples,
    aSamples,
    aSampleAvgSize,
    aDuration,
  ]);

  // Calculate storage cost
  const calculateStorageCost = (
    storage: string,
    gb: number,
    months: number,
    nSamples: number,
    requestsPerObj: number = 1,
    costBreakdown: string[] = []
  ): number => {
    costBreakdown.push("Storage Cost Breakdown:");
    
    // For Glacier Deep Archive, use flat pricing
    if (storage === "Deep Archive") {
      costBreakdown.push(`${storage} Cost: $${DEEP_ARCHIVE_STORAGE_COST_GB} per GB/Month`);
      const monthlyCost = DEEP_ARCHIVE_STORAGE_COST_GB * gb;
      const finalStorageCost = Math.round(monthlyCost * months * 100) / 100;
      costBreakdown.push(
        `Total Storage Cost: $${DEEP_ARCHIVE_STORAGE_COST_GB} x ${gb} GB x ${months} Month(s) = $${finalStorageCost}`
      );
      return finalStorageCost > 0 ? finalStorageCost : 0;
    }
    
    // For S3 Standard, implement tiered pricing
    costBreakdown.push(`${storage} uses tiered pricing:`);
    
    let monthlyCost = 0;
    
    // Calculate cost based on tiers
    if (gb <= TIER1_THRESHOLD_GB) {
      // All storage fits in first tier
      monthlyCost = gb * TIER1_RATE;
      costBreakdown.push(`Tier 1 (first 50 TB): ${gb.toLocaleString()} GB x $${TIER1_RATE} = $${(gb * TIER1_RATE).toFixed(2)}`);
    } else if (gb <= TIER2_THRESHOLD_GB) {
      // Storage spans first and second tiers
      const tier1Cost = TIER1_THRESHOLD_GB * TIER1_RATE;
      const tier2GB = gb - TIER1_THRESHOLD_GB;
      const tier2Cost = tier2GB * TIER2_RATE;
      
      costBreakdown.push(`Tier 1 (first 50 TB): ${TIER1_THRESHOLD_GB.toLocaleString()} GB x $${TIER1_RATE} = $${tier1Cost.toFixed(2)}`);
      costBreakdown.push(`Tier 2 (50-500 TB): ${tier2GB.toLocaleString()} GB x $${TIER2_RATE} = $${tier2Cost.toFixed(2)}`);
      
      monthlyCost = tier1Cost + tier2Cost;
      costBreakdown.push(`Total tier cost: $${tier1Cost.toFixed(2)} + $${tier2Cost.toFixed(2)} = $${monthlyCost.toFixed(2)}`);
    } else {
      // Storage spans all three tiers
      const tier1Cost = TIER1_THRESHOLD_GB * TIER1_RATE;
      const tier2Cost = (TIER2_THRESHOLD_GB - TIER1_THRESHOLD_GB) * TIER2_RATE;
      const tier3GB = gb - TIER2_THRESHOLD_GB;
      const tier3Cost = tier3GB * TIER3_RATE;
      
      costBreakdown.push(`Tier 1 (first 50 TB): ${TIER1_THRESHOLD_GB.toLocaleString()} GB x $${TIER1_RATE} = $${tier1Cost.toFixed(2)}`);
      costBreakdown.push(`Tier 2 (50-500 TB): ${(TIER2_THRESHOLD_GB - TIER1_THRESHOLD_GB).toLocaleString()} GB x $${TIER2_RATE} = $${tier2Cost.toFixed(2)}`);
      costBreakdown.push(`Tier 3 (over 500 TB): ${tier3GB.toLocaleString()} GB x $${TIER3_RATE} = $${tier3Cost.toFixed(2)}`);
      
      monthlyCost = tier1Cost + tier2Cost + tier3Cost;
      costBreakdown.push(`Total tier cost: $${tier1Cost.toFixed(2)} + $${tier2Cost.toFixed(2)} + $${tier3Cost.toFixed(2)} = $${monthlyCost.toFixed(2)}`);
    }
    
    const finalStorageCost = Math.round(monthlyCost * months * 100) / 100;
    
    if (months > 1) {
      costBreakdown.push(`${storage} cost (monthly): $${monthlyCost.toFixed(2)}`);
      costBreakdown.push(`Total Storage Cost (${months} months): $${finalStorageCost.toFixed(2)}`);
    }
    
    return finalStorageCost > 0 ? finalStorageCost : 0;
  };

  // Calculate data transfer cost
  const calculateDataTransferCost = (
    storage: string,
    gb: number,
    nSamples: number,
    times: number,
    requestsPerObj: number = 2,
    costBreakdown: string[] = []
  ): number => {
    // Simplified data transfer cost calculation
    costBreakdown.push("Data Transfer Cost Breakdown:");
    costBreakdown.push(
      `Data Transfer Out to Internet Cost: $${DATA_TRANSFER_OUT_COST} per GB`
    );

    const requestsCost = requestsPerObj * nSamples * GET_SELECT_REQUEST_COST;
    const transferCost = Math.round(gb * DATA_TRANSFER_OUT_COST * 100) / 100;

    const totalCost = (requestsCost + transferCost) * times;

    costBreakdown.push(
      `Total Data Transfer Cost: ($${requestsCost} + $${transferCost}) x ${times} Time(s) = $${totalCost}`
    );

    return totalCost > 0 ? totalCost : 0;
  };

  // Calculate advanced storage cost
  const calculateAdvancedStorageCost = (
    sampleMonthlyCount: number,
    sampleAvgSize: number,
    incomingMonths: number,
    storageMonths: number,
    costBreakdown: string[] = []
  ): number => {
    // Simplified implementation for the skeleton
    let totalCost = 0;
    let accumSamples = 0;

    for (let i = 0; i < storageMonths; i++) {
      if (i < incomingMonths) {
        accumSamples += sampleMonthlyCount;
      }

      const monthlyCost =
        accumSamples * sampleAvgSize * STANDARD_STORAGE_COST_GB;
      totalCost += monthlyCost;
    }

    return Math.round(totalCost * 100) / 100;
  };

  // Reset all inputs
  const resetInputs = () => {
    setMode("Simple");
    setCurrency("USD");
    setStorageClass("Standard Storage");
    setSSamples(0);
    setSSize(0);
    setSDuration(1);
    setSDownload(0);
    setSDownloadTimes(0);
    setSDownloadSamples(0);
    setASamples(0);
    setASampleAvgSize(0);
    setADuration([6, 12]);
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
      <Box maxWidth="1200px" mx="auto" p={4}>
        <Text fontStyle="italic">
          Calculations made based on the pricing information retrieved from AWS
          (Singapore) as of April 11, 2025.
        </Text>

        <Grid templateColumns="1fr 2fr" gap={6} mt={4}>
          <Box p={4} borderWidth={1} borderRadius="lg">
            <Button
              colorScheme="blue"
              onClick={onNgsModalOpen}
              mb={4}
              leftIcon={<FaDna />}
            >
              Show NGS Size Details
            </Button>

            <RadioGroup value={mode} onChange={setMode} mb={4}>
              <Stack direction="row" spacing={6} align="center">
                <Radio value="Simple" colorScheme="green">
                  Simple
                </Radio>
                <Radio value="Advanced" colorScheme="red">
                  Advanced
                </Radio>
              </Stack>
            </RadioGroup>

            <Text fontSize="sm" fontStyle="italic" mb={4}>
              Simple mode is for quick calculations, while Advanced mode allows
              for more detailed inputs.
            </Text>

            {mode === "Simple" && (
              <>
                <RadioGroup
                  value={storageClass}
                  onChange={setStorageClass}
                  mb={4}
                >
                  <Stack direction="row">
                    <Radio value="Standard Storage">Standard Storage</Radio>
                    <Radio value="Deep Archive">Glacier Deep Archive</Radio>
                  </Stack>
                </RadioGroup>

                <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <FaFolderOpen
                          style={{ display: "inline", marginRight: "8px" }}
                        />
                        Storage Inputs
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} bg="gray.50">
                      <Stack spacing={4}>
                        <Box>
                          <Text mb={1}>No of Samples/Files:</Text>
                          <NumberInput
                            min={0}
                            max={100000}
                            value={sSamples}
                            onChange={(_, val) => setSSamples(val)}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Box>

                        <Box>
                          <Text mb={1}>Total Storage Size (TB):</Text>
                          <NumberInput
                            min={0}
                            max={1000}
                            value={sSize}
                            onChange={(_, val) => setSSize(val)}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Box>

                        <Box>
                          <Text mb={1}>Storage Duration (Months):</Text>
                          <Slider
                            min={0}
                            max={120}
                            step={1}
                            value={sDuration}
                            onChange={(val) => setSDuration(val)}
                          >
                            <SliderTrack>
                              <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                          </Slider>
                          <Text textAlign="right">{sDuration} months</Text>
                        </Box>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <FaExchangeAlt
                          style={{ display: "inline", marginRight: "8px" }}
                        />
                        Data-Transfer Inputs
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} bg="gray.50">
                      <Stack spacing={4}>
                        <Box>
                          <Text mb={1}>Download Size (TB):</Text>
                          <NumberInput
                            min={0}
                            max={1000}
                            value={sDownload}
                            onChange={(_, val) => setSDownload(val)}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Box>

                        <Box>
                          <Text mb={1}>Download Times:</Text>
                          <NumberInput
                            min={0}
                            max={100}
                            step={1}
                            value={sDownloadTimes}
                            onChange={(_, val) => setSDownloadTimes(val)}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Box>

                        <Box>
                          <Text mb={1}>No of Downloading Samples/Files:</Text>
                          <NumberInput
                            min={0}
                            max={100000}
                            value={sDownloadSamples}
                            onChange={(_, val) => setSDownloadSamples(val)}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Box>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </>
            )}

            {mode === "Advanced" && (
              <Stack spacing={4}>
                <Box>
                  <Text mb={1}>Number of Samples incoming per Month:</Text>
                  <NumberInput
                    min={0}
                    max={10000}
                    value={aSamples}
                    onChange={(_, val) => setASamples(val)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>

                <Box>
                  <Text mb={1}>Average Sample Size (GB):</Text>
                  <NumberInput
                    min={0}
                    max={10000}
                    value={aSampleAvgSize}
                    onChange={(_, val) => setASampleAvgSize(val)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>

                <Box>
                  <Text mb={1}>Storage Timeline (Months):</Text>
                  {/* In a real implementation, you'd use a range slider here */}
                  <Text fontSize="sm" fontStyle="italic">
                    * Data incoming till {aDuration[0]} months and stored for
                    totally {aDuration[1]} months.
                  </Text>
                  <Stack spacing={2}>
                    <Text mb={1}>Data incoming duration (Months):</Text>
                    <Slider
                      min={1}
                      max={120}
                      step={1}
                      value={aDuration[0]}
                      onChange={(val) => {
                        // Ensure incoming duration doesn't exceed total duration
                        const newVal = Math.min(val, aDuration[1]);
                        setADuration([newVal, aDuration[1]]);
                      }}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Text textAlign="right">{aDuration[0]} months</Text>
                    
                    <Text mb={1} mt={2}>Total storage duration (Months):</Text>
                    <Slider
                      min={1}
                      max={120}
                      step={1}
                      value={aDuration[1]}
                      onChange={(val) => {
                        // Ensure total duration isn't less than incoming duration
                        const newVal = Math.max(val, aDuration[0]);
                        setADuration([aDuration[0], newVal]);
                      }}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Text textAlign="right">{aDuration[1]} months</Text>
                  </Stack>
                </Box>
              </Stack>
            )}

            <Button mt={4} colorScheme="red" onClick={resetInputs}>
              Reset filter
            </Button>
          </Box>

          {/* Results Panel */}
          <Box>
            <Box mt={4} mb={2}>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">US Dollar</option>
                <option value="SGD">Singapore Dollar</option>
              </Select>
            </Box>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={6}>
              {/* Value boxes */}
              <Card p={4} boxShadow="md">
                <Flex alignItems="center">
                  <FaDollarSign size={30} />
                  <Box ml={4}>
                    <Text fontWeight="bold">Total Cost</Text>
                    <Heading size="md">
                      {(currency === "SGD"
                        ? totalCost * 1.35
                        : totalCost
                      ).toFixed(2)}{" "}
                      {currency}
                    </Heading>
                  </Box>
                </Flex>
              </Card>

              <Card p={4} boxShadow="md">
                <Flex alignItems="center">
                  <FaFolderOpen size={30} />
                  <Box ml={4}>
                    <Text fontWeight="bold">Storage Cost</Text>
                    <Heading size="md">
                      {(currency === "SGD"
                        ? storageCost * 1.35
                        : storageCost
                      ).toFixed(2)}{" "}
                      {currency}
                    </Heading>
                  </Box>
                </Flex>
              </Card>

              <Card p={4} boxShadow="md">
                <Flex alignItems="center">
                  <FaExchangeAlt size={30} />
                  <Box ml={4}>
                    <Text fontWeight="bold">Data-Transfer Cost</Text>
                    <Heading size="md">
                      {(currency === "SGD"
                        ? downloadCost * 1.35
                        : downloadCost
                      ).toFixed(2)}{" "}
                      {currency}
                    </Heading>
                  </Box>
                </Flex>
              </Card>
            </Grid>

            <Button
              colorScheme="blue"
              onClick={onCostModalOpen}
              mb={6}
              leftIcon={<FaDollarSign />}
            >
              Show Cost Breakdown
            </Button>

            <Grid templateColumns="4fr 8fr" gap={6} h="350px">
              <Box borderWidth={1} p={2} textAlign="center">
                <Text>Pie Chart: Cost Distribution</Text>
                <Pie
                  data={{
                    labels: ["Storage Cost", "Data Transfer Cost"],
                    datasets: [
                      {
                        data: [storageCost, downloadCost],
                        backgroundColor: ["#4CAF50", "#FF9800"],
                      },
                    ],
                  }}
                />
              </Box>

              <Box borderWidth={1} p={2} textAlign="center">
                <Text>Bar Chart: Storage Cost Distribution</Text>
                <Bar
                  data={{
                    labels: storageCostDistribution.map((item) => item.Month),
                    datasets: [
                      {
                        label: "Storage Cost",
                        data: storageCostDistribution.map((item) => item.Cost),
                        backgroundColor: "#2196F3",
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Box>
            </Grid>

            <Box mt={10} h="300px" borderWidth={1} p={4} textAlign="center">
              <Text>Bar Chart: Accumulated Cost over Time</Text>
              <Bar
                data={{
                  labels: storageCostDistribution.map((item) => item.Month),
                  datasets: [
                    {
                      label: "Accumulated Cost",
                      data: storageCostDistribution.map(
                        (item) => item.Cost * (item.Month + 1)
                      ),
                      backgroundColor: "#FF5722",
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Grid>

        <Modal isOpen={isCostModalOpen} onClose={onCostModalClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cost Breakdown</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {costBreakdown.map((item, idx) => (
                <Text
                  key={idx}
                  fontWeight={item.endsWith(":") ? "bold" : "normal"}
                  textDecoration={item.endsWith(":") ? "underline" : "none"}
                  mb={2}
                >
                  {item}
                </Text>
              ))}
            </ModalBody>
            <ModalFooter>
              <Text>GeDaC, CSI</Text>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isNgsModalOpen} onClose={onNgsModalClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Sequencing Data Size Summary Across Various Techniques
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box overflowX="auto">
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                      <th style={{ border: "1px solid black", padding: "8px" }}>
                        Sequencing Type
                      </th>
                      <th style={{ border: "1px solid black", padding: "8px" }}>
                        Coverage/Read Details
                      </th>
                      <th style={{ border: "1px solid black", padding: "8px" }}>
                        Data Size
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {NGS_DETAILS.map((row, idx) => (
                      <tr key={idx}>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {row["Sequencing Type"]}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {row["Coverage/Read Details"]}
                        </td>
                        <td
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          {row["Data Size"]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Text>GeDaC, 2025</Text>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default S3CostCalculator;
