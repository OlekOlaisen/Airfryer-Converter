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

function App() {
  const [ovenTemp, setOvenTemp] = useState(180); // Default in Celsius
  const [ovenTime, setOvenTime] = useState(60);
  const [tempUnit, setTempUnit] = useState("C");
  const [airfryerTemp, setAirfryerTemp] = useState(0);
  const [airfryerTime, setAirfryerTime] = useState(0);
  const [selectedFood, setSelectedFood] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const foodSettings = React.useMemo(
    () => ({
      Chicken: { temp: 200, time: 45 },
      Fish: { temp: 180, time: 30 },
      Steak: { temp: 195, time: 40 },
      Vegetables: { temp: 175, time: 25 },
      PorkChops: { temp: 190, time: 35 },
      Pizza: { temp: 220, time: 15 },
      FrenchFries: { temp: 200, time: 18 },
      Bread: { temp: 180, time: 35 },
      Cupcakes: { temp: 175, time: 20 },
      Lasagna: { temp: 190, time: 30 },
      Quiche: { temp: 180, time: 45 },
      Meatballs: { temp: 175, time: 25 },
      Salmon: { temp: 180, time: 20 },
      Cookies: { temp: 170, time: 12 },
      Brownies: { temp: 175, time: 25 },
      FriedChicken: { temp: 180, time: 20 },
    }),
    []
  );

  const foodCategories = React.useMemo(
    () => ({
      Poultry: [
        { key: "chicken", displayName: "Chicken", temp: 200, time: 45 },
        {
          key: "fried_chicken",
          displayName: "Fried Chicken",
          temp: 180,
          time: 20,
        },
        { key: "meatballs", displayName: "Meatballs", temp: 175, time: 25 },
      ],
      Seafood: [
        { key: "fish", displayName: "Fish", temp: 180, time: 30 },
        { key: "salmon", displayName: "Salmon", temp: 180, time: 20 },
      ],
      Meat: [
        { key: "steak", displayName: "Steak", temp: 195, time: 40 },
        { key: "pork_chops", displayName: "Pork Chops", temp: 190, time: 35 },
      ],
      BakedGoods: [
        { key: "bread", displayName: "Bread", temp: 180, time: 35 },
        { key: "cupcakes", displayName: "Cupcakes", temp: 175, time: 20 },
        { key: "cookies", displayName: "Cookies", temp: 170, time: 12 },
        { key: "brownies", displayName: "Brownies", temp: 175, time: 25 },
      ],
      Vegetarian: [
        { key: "vegetables", displayName: "Vegetables", temp: 175, time: 25 },
        { key: "lasagna", displayName: "Lasagna", temp: 190, time: 30 },
        { key: "quiche", displayName: "Quiche", temp: 180, time: 45 },
      ],
      Snacks: [
        { key: "pizza", displayName: "Pizza", temp: 220, time: 15 },
        {
          key: "french_fries",
          displayName: "French Fries",
          temp: 200,
          time: 18,
        },
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
    if (selectedFood && foodSettings[selectedFood]) {
      const { temp, time } = foodSettings[selectedFood];
      const adjustedTemp = tempUnit === "F" ? celsiusToFahrenheit(temp) : temp;
      setOvenTemp(adjustedTemp);
      setOvenTime(time);
    }
  }, [selectedFood, tempUnit, foodSettings]);

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

  const toggleTempUnit = () => {
    if (tempUnit === "C") {
      setOvenTemp(Math.round(celsiusToFahrenheit(ovenTemp)));
      setTempUnit("F");
    } else {
      setOvenTemp(Math.round(fahrenheitToCelsius(ovenTemp)));
      setTempUnit("C");
    }
  };

  return (
    <Box p={5} bg={colorMode === "light" ? "gray.50" : "gray.800"} minH="100vh">
      <VStack spacing={4}>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="temp-unit-switch" mb="0">
            <Icon as={FaTemperatureHigh} mr={2} color="brand.500" />
            {tempUnit === "C" ? "Celsius" : "Fahrenheit"}
          </FormLabel>
          <Switch
            id="temp-unit-switch"
            onChange={toggleTempUnit}
            isChecked={tempUnit === "F"}
          />
        </FormControl>
        <Button onClick={toggleColorMode} size="sm" alignSelf="flex-end">
          {colorMode === "light" ? <Icon as={FaMoon} /> : <Icon as={FaSun} />}
        </Button>
        <Text fontSize="2xl" fontWeight="bold" color="brand.500">
          Oven to Airfryer Cooking Time Converter
        </Text>

        <Text>
          Oven Temperature ({tempUnit}): {ovenTemp}
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
        <Text>Oven Cooking Time (minutes): {ovenTime}</Text>
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
        <Box>
          <Text fontSize="lg" fontWeight="semibold">
            Converted Airfryer Settings:
          </Text>
          <Text>
            Temperature: {airfryerTemp} {tempUnit}
          </Text>
          <Text>Time: {airfryerTime} minutes</Text>
        </Box>
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
                        h="100px"
                        p={4}
                        bg={colorMode === "light" ? "blue.100" : "blue.700"}
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
