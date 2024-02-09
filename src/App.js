import React, { useState, useEffect } from "react";
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Select,
  Text,
  VStack,
  Switch,
  FormControl,
  FormLabel,
  Icon,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { FaSun, FaMoon, FaTemperatureHigh, FaClock } from "react-icons/fa";

function App() {
  const [ovenTemp, setOvenTemp] = useState(180); // Default in Celsius
  const [ovenTime, setOvenTime] = useState(60);
  const [tempUnit, setTempUnit] = useState("C");
  const [airfryerTemp, setAirfryerTemp] = useState(0);
  const [airfryerTime, setAirfryerTime] = useState(0);
  const [selectedFood, setSelectedFood] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();

  const foodSettings = React.useMemo(() => ({
    chicken: { temp: 200, time: 45 },
    fish: { temp: 180, time: 30 },
    steak: { temp: 195, time: 40 },
    vegetables: { temp: 175, time: 25 },
  }), []);

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
        <Select
          placeholder="Select food type"
          onChange={(e) => setSelectedFood(e.target.value)}
        >
          {Object.keys(foodSettings).map((food) => (
            <option key={food} value={food}>
              {food.charAt(0).toUpperCase() + food.slice(1)}
            </option>
          ))}
        </Select>
        
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
      </VStack>
    </Box>
  );
}

export default App;
