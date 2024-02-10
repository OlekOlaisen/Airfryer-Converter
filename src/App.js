import React, { useState, useEffect } from "react";
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  VStack,
  Flex,
  Icon,
  useColorMode,
  Button,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import {
  FaSun,
  FaMoon,
  FaTemperatureHigh,
  FaClock,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabList,
  Tab,
  Collapse,
} from "@chakra-ui/react";

function App() {
  const [tempUnit, setTempUnit] = useState(() => {
    return localStorage.getItem("tempUnit") || "C";
  });
  const [ovenTemp, setOvenTemp] = useState(180); // Default in Celsius
  const [ovenTime, setOvenTime] = useState(60);
  const [airfryerTemp, setAirfryerTemp] = useState(0);
  const [airfryerTime, setAirfryerTime] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  const [selectedDishName, setSelectedDishName] = useState("");
  const [isCustomSetting, setIsCustomSetting] = useState(false);
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);
  const [selectedDishInstructions, setSelectedDishInstructions] = useState("");

  const toast = useToast();

  const foodCategories = React.useMemo(
    () => ({
      Poultry: [
        {
          key: "chicken_roast",
          displayName: "Chicken Roast",
          temp: 200,
          time: 60,
          instructions:
            "Place chicken in the air fryer basket. Cook at {temp} for {time} minutes, flipping halfway through.",
        },
        {
          key: "turkey",
          displayName: "Turkey",
          temp: 180,
          time: 90,
          instructions:
            "Cook the turkey in the air fryer at {temp} for {time} minutes. Check internal temperature reaches 75°C.",
        },
        {
          key: "duck",
          displayName: "Duck",
          temp: 180,
          time: 80,
          instructions:
            "Air fry duck at {temp} for {time} minutes. Ensure skin is crispy and internal temperature is safe.",
        },
        {
          key: "chicken_wings",
          displayName: "Chicken Wings",
          temp: 190,
          time: 25,
          instructions:
            "Cook wings at {temp} for {time} minutes, turning them halfway through the cooking time.",
        },
        {
          key: "fried_chicken",
          displayName: "Fried Chicken",
          temp: 180,
          time: 20,
          instructions:
            "Place chicken in the basket. Cook at {temp} for {time} minutes, turning halfway through.",
        },
      ],
      Seafood: [
        {
          key: "shrimp",
          displayName: "Shrimp",
          temp: 200,
          time: 10,
          instructions:
            "Cook shrimp at {temp} for {time} minutes, until pink and cooked through.",
        },
        {
          key: "cod",
          displayName: "Cod",
          temp: 180,
          time: 15,
          instructions:
            "Place cod fillets in the basket, cook at {temp} for {time} minutes until flaky.",
        },
        {
          key: "salmon_fillets",
          displayName: "Salmon Fillets",
          temp: 180,
          time: 12,
          instructions:
            "Air fry salmon at {temp} for {time} minutes, or until it easily flakes with a fork.",
        },
        {
          key: "tuna_steaks",
          displayName: "Tuna Steaks",
          temp: 190,
          time: 8,
          instructions:
            "Cook tuna steaks at {temp} for {time} minutes, turning once halfway through.",
        },
      ],
      Meat: [
        {
          key: "beef_roast",
          displayName: "Beef Roast",
          temp: 195,
          time: 75,
          instructions:
            "Cook the beef roast in the air fryer at {temp} for {time} minutes. Turn halfway through cooking. Ensure the internal temperature reaches at least 63°C for medium-rare.",
        },
        {
          key: "lamb_chops",
          displayName: "Lamb Chops",
          temp: 200,
          time: 25,
          instructions:
            "Air fry lamb chops at {temp} for {time} minutes, turning once halfway through. Aim for an internal temperature of 63°C for medium-rare.",
        },
        {
          key: "pork_loin",
          displayName: "Pork Loin",
          temp: 190,
          time: 60,
          instructions:
            "Place pork loin in the air fryer. Cook at {temp} for {time} minutes, flipping halfway. Check that internal temperature reaches at least 71°C.",
        },
        {
          key: "ribs",
          displayName: "Ribs",
          temp: 200,
          time: 40,
          instructions:
            "Cook ribs at {temp} for {time} minutes, turning them occasionally. Ensure they're cooked through and tender.",
        },
      ],
      BakedGoods: [
        {
          key: "banana_bread",
          displayName: "Banana Bread",
          temp: 175,
          time: 60,
          instructions:
            "Air fry banana bread at {temp} for {time} minutes. Check doneness with a toothpick inserted into the center coming out clean.",
        },
        {
          key: "sourdough",
          displayName: "Sourdough",
          temp: 220,
          time: 30,
          instructions:
            "Place sourdough loaf in the air fryer. Cook at {temp} for {time} minutes until the crust is golden and sounds hollow when tapped.",
        },
        {
          key: "muffins",
          displayName: "Muffins",
          temp: 180,
          time: 20,
          instructions:
            "Cook muffins at {temp} for {time} minutes, or until a toothpick comes out clean. Allow to cool before serving.",
        },
        {
          key: "garlic_bread",
          displayName: "Garlic Bread",
          temp: 175,
          time: 10,
          instructions:
            "Air fry garlic bread at {temp} for {time} minutes until golden brown and crispy.",
        },
      ],
      Vegetarian: [
        {
          key: "stuffed_peppers",
          displayName: "Stuffed Peppers",
          temp: 175,
          time: 25,
          instructions:
            "Cook stuffed peppers at {temp} for {time} minutes, until peppers are tender and filling is heated through.",
        },
        {
          key: "cauliflower_steak",
          displayName: "Cauliflower Steak",
          temp: 200,
          time: 20,
          instructions:
            "Air fry cauliflower steaks at {temp} for {time} minutes, flipping halfway through, until edges are crispy and browned.",
        },
        {
          key: "vegetable_kabobs",
          displayName: "Vegetable Kabobs",
          temp: 180,
          time: 15,
          instructions:
            "Cook vegetable kabobs at {temp} for {time} minutes, turning occasionally, until vegetables are tender and slightly charred.",
        },
        {
          key: "tofu",
          displayName: "Tofu",
          temp: 180,
          time: 15,
          instructions:
            "Place tofu in the air fryer and cook at {temp} for {time} minutes, flipping halfway through, until all sides are crispy and golden.",
        },
      ],
      Snacks: [
        {
          key: "nachos",
          displayName: "Nachos",
          temp: 200,
          time: 10,
          instructions:
            "Layer nachos in the air fryer basket. Cook at {temp} for {time} minutes until cheese is melted and chips are crispy.",
        },
        {
          key: "popcorn",
          displayName: "Popcorn",
          temp: 190,
          time: 15,
          instructions:
            "Place popcorn kernels in a suitable container or use air fryer popcorn accessories. Cook at {temp} for {time} minutes or until popping slows.",
        },
        {
          key: "potato_chips",
          displayName: "Potato Chips",
          temp: 190,
          time: 10,
          instructions:
            "Cook potato chips at {temp} for {time} minutes, shaking the basket halfway through until chips are crispy and golden.",
        },
        {
          key: "mozzarella_sticks",
          displayName: "Mozzarella Sticks",
          temp: 200,
          time: 8,
          instructions:
            "Air fry mozzarella sticks at {temp} for {time} minutes, turning once halfway through, until golden and cheese begins to ooze.",
        },
      ],
      Desserts: [
        {
          key: "apple_pie",
          displayName: "Apple Pie",
          temp: 175,
          time: 45,
          instructions:
            "Cook apple pie at {temp} for {time} minutes, until the crust is golden and the filling is bubbly.",
        },
        {
          key: "chocolate_cake",
          displayName: "Chocolate Cake",
          temp: 180,
          time: 30,
          instructions:
            "Air fry chocolate cake at {temp} for {time} minutes. Check doneness with a toothpick coming out clean.",
        },
        {
          key: "cheesecake",
          displayName: "Cheesecake",
          temp: 160,
          time: 30,
          instructions:
            "Cook cheesecake at {temp} for {time} minutes until the edges are set but the center is slightly wobbly.",
        },
        {
          key: "donuts",
          displayName: "Donuts",
          temp: 180,
          time: 10,
          instructions:
            "Air fry donuts at {temp} for {time} minutes, until they are golden brown and cooked through.",
        },
      ],
    }),
    []
  );

  const selectFood = (dish) => {
    const { temp, time, displayName, instructions } = dish;

    // Calculate air fryer settings based on the dish's temp and time
    const calculatedTemp =
      tempUnit === "C" ? temp - 20 : celsiusToFahrenheit(temp - 20);
    const calculatedTime = Math.round(time - time * 0.2);

    // Convert calculatedTemp back to the current unit if needed
    const displayTemp =
      tempUnit === "C"
        ? calculatedTemp
        : Math.round(celsiusToFahrenheit(calculatedTemp));

    // Dynamic replacement with the new placeholders, including the unit next to the temperature
    const dynamicInstructions = instructions
      .replace(/\{temp\}/g, `${displayTemp}°${tempUnit}`) // Now includes the unit
      .replace(/\{time\}/g, calculatedTime);

    setOvenTemp(temp);
    setOvenTime(time);
    setAirfryerTemp(calculatedTemp);
    setAirfryerTime(calculatedTime);

    setSelectedDishName(displayName);
    setSelectedDishInstructions(dynamicInstructions); // Use the dynamically replaced instructions with unit
    setIsCustomSetting(false);
    // Removed setIsFooterExpanded(true) to prevent automatic expansion on dish selection

    toast({
      title: `${displayName} settings applied.`,
      description: `Air fryer set to ${displayTemp}°${tempUnit} for ${calculatedTime} minutes.`,
      status: "info",
      duration: 1500,
      isClosable: true,
      position: "top",
    });
  };


  const toggleFooter = () => {
    setIsFooterExpanded(!isFooterExpanded);
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

  useEffect(() => {
    localStorage.setItem("tempUnit", tempUnit);
  }, [tempUnit]);

  const handleTempUnitChange = (index) => {
    const newUnit = index === 0 ? "C" : "F";
    if (tempUnit !== newUnit) {
      if (newUnit === "F") {
        setOvenTemp(Math.round(celsiusToFahrenheit(ovenTemp)));
      } else {
        setOvenTemp(Math.round(fahrenheitToCelsius(ovenTemp)));
      }
      setTempUnit(newUnit);
      // Save the tab index to local storage
      localStorage.setItem("tempUnitIndex", index.toString());
    }
  };

  const defaultTabIndex = parseInt(
    localStorage.getItem("tempUnitIndex") || "0",
    10
  );

  return (
    <Box p={5} bg={colorMode === "light" ? "gray.50" : "gray.800"} minH="100vh">
      <VStack spacing={4}>
        <Flex width="100%" justifyContent="space-between">
          <Tabs
            variant="line"
            colorScheme="teal"
            onChange={handleTempUnitChange}
            defaultIndex={defaultTabIndex}
          >
            
            <TabList>
              <Tab>°C</Tab>
              <Tab>°F</Tab>
            </TabList>
          </Tabs>
          <Button onClick={toggleColorMode} size="sm" alignSelf="flex-end">
            {colorMode === "light" ? <Icon as={FaMoon} /> : <Icon as={FaSun} />}
          </Button>
        </Flex>

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
          onChange={(val) => {
            setOvenTemp(val);
            setIsCustomSetting(true);
            setSelectedDishInstructions(""); // Reset instructions
            setIsFooterExpanded(false); // Collapse the footer
          }}
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
          onChange={(val) => {
            setOvenTime(val);
            setIsCustomSetting(true);
            setSelectedDishInstructions(""); // Reset instructions
            setIsFooterExpanded(false); // Collapse the footer
          }}
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
          onClick={toggleFooter}
        >
          <VStack spacing={2}>
            <Icon
              as={isFooterExpanded ? FaChevronDown : FaChevronUp}
              w={6}
              h={6}
            />
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              {isCustomSetting
                ? "Custom Oven to AirFryer"
                : selectedDishName || "Converted Airfryer Settings"}
            </Text>

            <Text fontSize="md">
              Air fry for {airfryerTime} minutes at {airfryerTemp}°{tempUnit}
            </Text>

            <Collapse in={isFooterExpanded} animateOpacity>
              <Box p={4} bg="gray.800" color="gray.100" w="full">
                {/* Placeholder for detailed instructions. You can replace this with actual content based on the selected dish. */}
                <Text>{selectedDishInstructions}</Text>
              </Box>
            </Collapse>
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
        <Accordion allowToggle w="full">
          {Object.entries(foodCategories).map(
            ([category, dishes], index, array) => (
              <AccordionItem key={category}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {category}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={index === array.length - 1 ? "150px" : "4"}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    {dishes.map((dish) => (
                      <GridItem w="100%" key={dish.key}>
                        <Box
                          as="button"
                          w="100%"
                          h="100px"
                          minW="100px"
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
            )
          )}
        </Accordion>
      </VStack>
    </Box>
  );
}

export default App;
