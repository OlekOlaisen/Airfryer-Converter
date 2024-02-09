import React, { useState, useEffect } from "react";
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  VStack,
  Switch,
  FormControl,
  FormLabel,
  Icon,
  useColorMode,
  Button,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { FaSun, FaMoon, FaTemperatureHigh, FaClock } from "react-icons/fa";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  // other imports remain the same
} from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

function App() {
  const [ovenTemp, setOvenTemp] = useState(180); // Default in Celsius
  const [ovenTime, setOvenTime] = useState(60);
  const [tempUnit, setTempUnit] = useState("C");
  const [airfryerTemp, setAirfryerTemp] = useState(0);
  const [airfryerTime, setAirfryerTime] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  const [selectedDishName, setSelectedDishName] = useState("");
  const toast = useToast();

  const foodCategories = React.useMemo(
    () => ({
      Poultry: [
        {
          key: "chicken_roast",
          displayName: "Chicken Roast",
          temp: 200,
          time: 60,
        },
        { key: "turkey", displayName: "Turkey", temp: 180, time: 90 },
        { key: "duck", displayName: "Duck", temp: 180, time: 80 },
        {
          key: "chicken_wings",
          displayName: "Chicken Wings",
          temp: 190,
          time: 25,
        },
        {
          key: "fried_chicken",
          displayName: "Fried Chicken",
          temp: 180,
          time: 20,
        },
        // Add more poultry dishes here
      ],
      Seafood: [
        { key: "shrimp", displayName: "Shrimp", temp: 200, time: 10 },
        { key: "cod", displayName: "Cod", temp: 180, time: 15 },
        {
          key: "salmon_fillets",
          displayName: "Salmon Fillets",
          temp: 180,
          time: 12,
        },
        { key: "tuna_steaks", displayName: "Tuna Steaks", temp: 190, time: 8 },
        // Add more seafood dishes here
      ],
      Meat: [
        { key: "beef_roast", displayName: "Beef Roast", temp: 195, time: 75 },
        { key: "lamb_chops", displayName: "Lamb Chops", temp: 200, time: 25 },
        { key: "pork_loin", displayName: "Pork Loin", temp: 190, time: 60 },
        { key: "ribs", displayName: "Ribs", temp: 200, time: 40 },
        // Add more meat dishes here
      ],
      BakedGoods: [
        {
          key: "banana_bread",
          displayName: "Banana Bread",
          temp: 175,
          time: 60,
        },
        { key: "sourdough", displayName: "Sourdough", temp: 220, time: 30 },
        { key: "muffins", displayName: "Muffins", temp: 180, time: 20 },
        {
          key: "garlic_bread",
          displayName: "Garlic Bread",
          temp: 175,
          time: 10,
        },
        // Add more baked goods here
      ],
      Vegetarian: [
        {
          key: "stuffed_peppers",
          displayName: "Stuffed Peppers",
          temp: 175,
          time: 25,
        },
        {
          key: "cauliflower_steak",
          displayName: "Cauliflower Steak",
          temp: 200,
          time: 20,
        },
        {
          key: "vegetable_kabobs",
          displayName: "Vegetable Kabobs",
          temp: 180,
          time: 15,
        },
        { key: "tofu", displayName: "Tofu", temp: 180, time: 15 },
        // Add more vegetarian dishes here
      ],
      Snacks: [
        { key: "nachos", displayName: "Nachos", temp: 200, time: 10 },
        { key: "popcorn", displayName: "Popcorn", temp: 190, time: 15 },
        {
          key: "potato_chips",
          displayName: "Potato Chips",
          temp: 190,
          time: 10,
        },
        {
          key: "mozzarella_sticks",
          displayName: "Mozzarella Sticks",
          temp: 200,
          time: 8,
        },
        // Add more snacks here
      ],
      Desserts: [
        { key: "apple_pie", displayName: "Apple Pie", temp: 175, time: 45 },
        {
          key: "chocolate_cake",
          displayName: "Chocolate Cake",
          temp: 180,
          time: 30,
        },
        { key: "cheesecake", displayName: "Cheesecake", temp: 160, time: 30 },
        { key: "donuts", displayName: "Donuts", temp: 180, time: 10 },
        // Add more desserts here
      ],
    }),
    []
  );

  const selectFood = (dish) => {
    const { temp, time, displayName } = dish;
    // Calculate air fryer settings
    const airfryerTemp =
      tempUnit === "C" ? temp - 20 : celsiusToFahrenheit(temp - 20);
    const airfryerTime = Math.round(time - time * 0.2);

    // Apply settings
    setOvenTemp(temp);
    setOvenTime(time);
    setAirfryerTemp(airfryerTemp);
    setAirfryerTime(airfryerTime);

    setSelectedDishName(displayName);

    // Display toast with air fryer settings
    toast({
      title: `${displayName} settings applied.`,
      description: `Air fryer set to ${airfryerTemp}°${tempUnit} for ${airfryerTime} minutes.`,
      status: "info",
      duration: 1500,
      isClosable: true,
    });
  };

  const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
  const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

  useEffect(() => {
    let temp = tempUnit === "C" ? ovenTemp : fahrenheitToCelsius(ovenTemp);
    let airfryerTempCelsius = temp - 20;
    let airfryerTimeMinutes = ovenTime - ovenTime * 0.2;
    if (tempUnit === "F") {
      airfryerTempCelsius = celsiusToFahrenheit(airfryerTempCelsius);
    }
    setAirfryerTemp(Math.round(airfryerTempCelsius));
    setAirfryerTime(Math.round(airfryerTimeMinutes));
  }, [ovenTemp, ovenTime, tempUnit]);

  const handleTempUnitChange = (index) => {
    const newUnit = index === 0 ? "C" : "F";
    if (tempUnit !== newUnit) {
      if (newUnit === "F") {
        // Convert from Celsius to Fahrenheit
        setOvenTemp(Math.round(celsiusToFahrenheit(ovenTemp)));
      } else {
        // Convert from Fahrenheit to Celsius
        setOvenTemp(Math.round(fahrenheitToCelsius(ovenTemp)));
      }
      setTempUnit(newUnit);
    }
  };

  return (
    <Box p={5} bg={colorMode === "light" ? "gray.50" : "gray.800"} minH="100vh">
      <VStack spacing={4}>
        <FormControl display="flex" alignItems="center">
          <Icon as={FaTemperatureHigh} mr={2} color="brand.500" />

          <Tabs
            variant="line"
            colorScheme="red"
            onChange={handleTempUnitChange}
          >
            <TabList>
              <Tab>°C</Tab>
              <Tab>°F</Tab>
            </TabList>
          </Tabs>
        </FormControl>
        <Button onClick={toggleColorMode} size="sm" alignSelf="flex-end">
          {colorMode === "light" ? <Icon as={FaMoon} /> : <Icon as={FaSun} />}
        </Button>
        <Text fontSize="2xl" fontWeight="bold" color="brand.500">
          Oven to Airfryer Cooking Time
        </Text>

        <Text>
          Oven Temperature {ovenTemp} °{tempUnit}:
        </Text>
        <Slider
          aria-label="oven-temp-slider"
          min={tempUnit === "C" ? 100 : celsiusToFahrenheit(100)}
          max={tempUnit === "C" ? 250 : celsiusToFahrenheit(250)}
          value={ovenTemp}
          onChange={(val) => setOvenTemp(val)}
          colorScheme="teal"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="teal.500" as={FaTemperatureHigh} />
          </SliderThumb>
        </Slider>
        <Text>Oven Cooking Time: {ovenTime} minutes </Text>
        <Slider
          aria-label="oven-time-slider"
          min={10}
          max={120}
          value={ovenTime}
          onChange={(val) => setOvenTime(val)}
          colorScheme="teal"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="teal.500" as={FaClock} />
          </SliderThumb>
        </Slider>
        <Box
          position="fixed"
          bottom="0"
          width="100%"
          bg={colorMode === "dark" ? "gray.700" : "gray.400"} // Adjust for light/dark mode
          p={4}
          boxShadow="0 -2px 10px rgba(0, 0, 0, 0.1)" // Adds a slight shadow for depth
          zIndex="banner"
          color={colorMode === "dark" ? "white" : "gray.800"} // Text color for readability
        >
          <VStack spacing={2}>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              {selectedDishName
                ? selectedDishName
                : "Converted Airfryer Settings"}
            </Text>
            <Text fontSize="md">
              Air fry for {airfryerTime} minutes at {airfryerTemp}°{tempUnit}
            </Text>
          </VStack>
        </Box>
        <Alert status="warning" borderRadius="md" mb={4}>
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Cooking times may vary</AlertTitle>
            <AlertDescription display="block">
              Cooking times may vary depending on your specific airfryer model.
              Please use the settings below as a guideline and adjust as
              necessary.
            </AlertDescription>
          </Box>
        </Alert>
        <Accordion allowMultiple w="full">
          {Object.entries(foodCategories).map(([category, dishes]) => (
            <AccordionItem key={category}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {category}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  {dishes.map((dish) => (
                    <GridItem w="100%" key={dish.key}>
                      <Box
                        as="button"
                        w="100%" // Use 100% to make sure it fills the column space
                        h="100px" // Set a fixed height
                        minW="100px" // Minimum width ensures consistency in smaller viewports
                        p={4}
                        bg={colorMode === "light" ? "blue.500" : "blue.500"}
                        color="white"
                        rounded="md"
                        shadow="md"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        onClick={() => selectFood(dish)}
                      >
                        <Icon as={FaTemperatureHigh} w={5} h={5} mb={2} />
                        <Text textAlign="center" fontWeight="bold">
                          {dish.displayName}
                        </Text>
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Box>
  );
}

export default App;
