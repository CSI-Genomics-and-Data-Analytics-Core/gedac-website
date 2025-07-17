import React from "react";
import Layout from "@theme/Layout";
import {
  ChakraProvider,
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  Badge,
  Flex,
  Grid,
  Image,
  useColorModeValue,
  ScaleFade,
  useDisclosure,
  extendTheme,
} from "@chakra-ui/react";
import { FaRocket, FaRProject, FaPython, FaArrowRight } from "react-icons/fa";

const theme = extendTheme({
  styles: {
    global: {
      ":where(img, svg, video, canvas, audio, iframe, embed, object)": {
        display: "inline",
      },
    },
  },
});
const LaunchpadContent = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const [isLoading, setIsLoading] = React.useState(false);

  const cardBg = useColorModeValue("white", "gray.700");
  const stepBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const headingColor = useColorModeValue("black", "white");
  const iconColor = useColorModeValue("purple.600", "purple.300");
  const iconBg = useColorModeValue("purple.100", "purple.800");

  const handleLaunchClick = async () => {
    if (isLoading) return; // Prevent multiple clicks
    
    setIsLoading(true);
    
    try {
      // Method 1: Try to access the internal service directly
      // This is the most reliable way to check NUS network connectivity
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

      // Try to reach the internal service
      const response = await fetch("http://172.18.149.93/", {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      // If we get here, the service is accessible
      window.open("http://172.18.149.93/", "_blank");
      return;
      
    } catch (error) {
      console.log("Direct access failed:", error);
      
      // Method 2: Check if we can reach a known NUS endpoint
      try {
        const nusCheck = await fetch("https://www.nus.edu.sg/favicon.ico", {
          method: "HEAD",
          mode: "no-cors",
        });
        
        // If NUS site is reachable but internal service isn't, show specific message
        alert("You appear to be connected to the internet, but the internal NUS service is not accessible. Please ensure you're connected to NUS WiFi or VPN and try again.");
        
      } catch (nusError) {
        // If we can't reach NUS site either, it's likely a general connectivity issue
        alert("Network connection issue detected. Please check your internet connection and ensure you're connected to NUS WiFi or VPN.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      color={textColor}
      display="flex"
      alignItems="center"
      py={8}
      w="full"
    >
      <Container maxW="container.2xl">
        <VStack spacing={12} align="center">
          {/* Hero Content */}
          <ScaleFade in={isOpen} initialScale={0.9}>
            <VStack spacing={6} textAlign="center" maxW="1000px">
              <Heading size="2xl" lineHeight="shorter" color={headingColor}>
                Launch Your{" "}
                <Text
                  as="span"
                  bgGradient="linear(to-r, yellow.300, yellow.600)"
                  bgClip="text"
                >
                  Data Science
                </Text>{" "}
                Environment
              </Heading>

              <Text fontSize="xl" opacity={0.9}>
                Access your{" "}
                <Badge
                  colorScheme="orange"
                  fontSize="md"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  Free
                </Badge>{" "}
                personal RStudio or JupyterLab instance{" "}
                <Badge
                  colorScheme="blue"
                  fontSize="md"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  instantly
                </Badge>
                <br />
                Zero installation, maximum productivity, NUS-grade security.
              </Text>

              <Button
                size="lg"
                colorScheme="purple"
                variant="solid"
                leftIcon={<FaRocket />}
                onClick={handleLaunchClick}
                isLoading={isLoading}
                loadingText="Connecting..."
                disabled={isLoading}
                _hover={{
                  transform: isLoading ? "none" : "translateY(-2px)",
                  boxShadow: isLoading ? "none" : "lg",
                }}
                px={8}
                fontSize="lg"
              >
                {isLoading ? "Connecting..." : "Get Started"}
              </Button>
              {/* Steps */}
              <Box bg={stepBg} borderRadius="xl" p={6} w="full">
                <Text fontWeight="semibold" mb={6} textAlign="center">
                  How it works:
                </Text>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  align="center"
                  justify="center"
                  gap={6}
                >
                  <VStack spacing={3} align="center" flex={1}>
                    <Flex
                      w={10}
                      h={10}
                      bg="purple.500"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      fontSize="lg"
                      fontWeight="bold"
                      color="white"
                      boxShadow="md"
                    >
                      1
                    </Flex>
                    <Text textAlign="center" fontWeight="medium" fontSize="sm">
                      Connect NUS WiFi or VPN
                    </Text>
                  </VStack>

                  <Box
                    color="purple.500"
                    display={{ base: "block", md: "none" }}
                  >
                    <FaArrowRight style={{ transform: "rotate(90deg)" }} />
                  </Box>
                  <Box
                    color="purple.500"
                    display={{ base: "none", md: "block" }}
                  >
                    <FaArrowRight />
                  </Box>

                  <VStack spacing={3} align="center" flex={1}>
                    <Flex
                      w={10}
                      h={10}
                      bg="purple.500"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      fontSize="lg"
                      fontWeight="bold"
                      color="white"
                      boxShadow="md"
                    >
                      2
                    </Flex>
                    <Text textAlign="center" fontWeight="medium" fontSize="sm">
                      Choose Platform
                    </Text>
                  </VStack>

                  <Box
                    color="purple.500"
                    display={{ base: "block", md: "none" }}
                  >
                    <FaArrowRight style={{ transform: "rotate(90deg)" }} />
                  </Box>
                  <Box
                    color="purple.500"
                    display={{ base: "none", md: "block" }}
                  >
                    <FaArrowRight />
                  </Box>

                  <VStack spacing={3} align="center" flex={1}>
                    <Flex
                      w={10}
                      h={10}
                      bg="purple.500"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      fontSize="lg"
                      fontWeight="bold"
                      color="white"
                      boxShadow="md"
                    >
                      3
                    </Flex>
                    <Text textAlign="center" fontWeight="medium" fontSize="sm">
                      Launch & Code
                    </Text>
                  </VStack>
                </Flex>
              </Box>
            </VStack>
          </ScaleFade>

          {/* Platform Cards */}
          <ScaleFade in={isOpen} initialScale={0.9} delay={0.2}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={6}
              maxW="1000px"
              w="full"
            >
              <Card
                bg={cardBg}
                position="relative"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "2xl",
                }}
                transition="all 0.3s"
              >
                <Badge
                  position="absolute"
                  top={-2}
                  left="50%"
                  transform="translateX(-50%)"
                  colorScheme="blue"
                  fontSize="xs"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  Popular
                </Badge>

                <CardBody textAlign="center" pt={8}>
                  <Flex
                    w={20}
                    h={20}
                    bg={iconBg}
                    borderRadius="xl"
                    align="center"
                    justify="center"
                    mx="auto"
                    mb={4}
                  >
                    <FaRProject size={40} color={iconColor} />
                  </Flex>

                  <Heading size="lg" mb={2} color={headingColor}>
                    RStudio
                  </Heading>
                  <Text fontSize="sm" mb={4} opacity={0.9}>
                    Statistical Computing & Data Analysis
                  </Text>

                  <HStack spacing={2} justify="center" mb={4} flexWrap="wrap">
                    <Badge
                      variant="subtle"
                      colorScheme="blue"
                      borderRadius="full"
                    >
                      R Language
                    </Badge>
                    <Badge
                      variant="subtle"
                      colorScheme="blue"
                      borderRadius="full"
                    >
                      Statistics
                    </Badge>
                    <Badge
                      variant="subtle"
                      colorScheme="blue"
                      borderRadius="full"
                    >
                      Visualization
                    </Badge>
                  </HStack>

                  <Text fontSize="sm" opacity={0.8}>
                    Perfect for statistical analysis, data visualization, and R
                    programming with a full IDE experience.
                  </Text>
                </CardBody>
              </Card>

              <Card
                bg={cardBg}
                position="relative"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "xl",
                }}
                transition="all 0.3s"
              >
                <Badge
                  position="absolute"
                  top={-2}
                  left="50%"
                  transform="translateX(-50%)"
                  colorScheme="orange"
                  fontSize="xs"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  Flexible
                </Badge>

                <CardBody textAlign="center" pt={8}>
                  <Flex
                    w={20}
                    h={20}
                    bg={iconBg}
                    borderRadius="xl"
                    align="center"
                    justify="center"
                    mx="auto"
                    mb={4}
                  >
                    <FaPython size={40} color={iconColor} />
                  </Flex>

                  <Heading size="lg" mb={2} color={headingColor}>
                    JupyterLab
                  </Heading>
                  <Text fontSize="sm" mb={4} opacity={0.9}>
                    Interactive Computing & Notebooks
                  </Text>

                  <HStack spacing={2} justify="center" mb={4} flexWrap="wrap">
                    <Badge
                      variant="subtle"
                      colorScheme="orange"
                      borderRadius="full"
                    >
                      Python
                    </Badge>
                    <Badge
                      variant="subtle"
                      colorScheme="orange"
                      borderRadius="full"
                    >
                      Notebooks
                    </Badge>
                    <Badge
                      variant="subtle"
                      colorScheme="orange"
                      borderRadius="full"
                    >
                      Multi-language
                    </Badge>
                  </HStack>

                  <Text fontSize="sm" opacity={0.8}>
                    Ideal for data science workflows, machine learning, and
                    interactive computing with multiple languages.
                  </Text>
                </CardBody>
              </Card>
            </Grid>
          </ScaleFade>
        </VStack>
      </Container>
    </Box>
  );
};

const LaunchpadPage = () => {
  return (
    <Layout
      title="GeDaC Launchpad"
      description="Launch your personal RStudio or JupyterLab instance instantly"
    >
      <ChakraProvider theme={theme}>
        <LaunchpadContent />
      </ChakraProvider>
    </Layout>
  );
};

export default LaunchpadPage;
