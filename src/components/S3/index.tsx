import React, { useState, useEffect, useCallback } from "react";
import {
  FaUser,
  FaWallet,
  FaDollarSign,
  FaEllipsisH,
  FaFolderOpen,
  FaDna,
  FaPlusCircle,
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
} from "@chakra-ui/react";

// Constants
const KB_IN_GB = 1048576;
const GB_IN_TB = 1024;

// AWS pricing information
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
    "Sequencing Type": "Whole Genome Sequencing (WGS)",
    "Coverage/Read Details": "30x coverage",
    "Data Size": "100-150 GB",
  },
  {
    "Sequencing Type": "Whole Exome Sequencing (WES)",
    "Coverage/Read Details": "100x coverage",
    "Data Size": "10-15 GB",
  },
  {
    "Sequencing Type": "RNA-Seq",
    "Coverage/Read Details": "30M paired-end reads",
    "Data Size": "5-10 GB",
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
    // Simplified storage cost calculation
    const storageCostGb =
      storage === "Standard Storage"
        ? STANDARD_STORAGE_COST_GB
        : DEEP_ARCHIVE_STORAGE_COST_GB;

    costBreakdown.push("Storage Cost Breakdown:");
    costBreakdown.push(`${storage} Cost: $${storageCostGb} per GB/Month`);

    const monthlyCost = storageCostGb * gb;
    const finalStorageCost = Math.round(monthlyCost * months * 100) / 100;

    costBreakdown.push(
      `Total Storage Cost: $${storageCostGb} x ${gb} GB x ${months} Month(s) = $${finalStorageCost}`
    );

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

  return (
    <ChakraProvider>
      <Box maxWidth="1200px" mx="auto" p={4}>
        <Text fontStyle="italic">
          Calculations made based on the pricing information retrieved from AWS
          (Singapore) as of June 05, 2024.
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
                            min={1}
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
                            min={1}
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
                    min={1}
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
                    min={1}
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

            <Grid templateColumns="5fr 7fr" gap={6} h="300px">
              <Box borderWidth={1} p={4} textAlign="center">
                <Text>Pie Chart: Cost Distribution</Text>
              </Box>

              <Box borderWidth={1} p={4} textAlign="center">
                <Text>Bar Chart: Storage Cost Distribution</Text>
              </Box>
            </Grid>

            <Box mt={6} h="300px" borderWidth={1} p={4} textAlign="center">
              <Text>Bar Chart: Accumulated Cost over Time</Text>
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
