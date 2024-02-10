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
  Tag,
  TagLabel,
  useToast,
} from "@chakra-ui/react";
import {
  FaSun,
  FaMoon,
  FaTemperatureHigh,
  FaClock,
  FaCheck,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { Tabs, TabList, Tab, Collapse, Image } from "@chakra-ui/react";
import ChickenRoast from "./assets/poultry/chickenroast.jpg";
import Turkey from "./assets/poultry/turkey.jpg";
import Duck from "./assets/poultry/duck.jpg";
import ChickenWings from "./assets/poultry/chickenwings.jpg";
import FriedChicken from "./assets/poultry/friedchicken.jpg";
import Shrimp from "./assets/seafood/shrimp.jpg";
import Cod from "./assets/seafood/cod.jpg";
import Salmon from "./assets/seafood/salmon.jpg";
import Tuna from "./assets/seafood/tuna.jpg";
import BeefRoast from "./assets/meat/beefroast.jpg";
import LambChops from "./assets/meat/lambchops.jpg";
import PorkLoin from "./assets/meat/porkloin.jpg";
import Ribs from "./assets/meat/ribs.jpg";
import BananaBread from "./assets/bakedgoods/bananabread.jpg";
import Sourdough from "./assets/bakedgoods/sourdough.jpg";
import Muffins from "./assets/bakedgoods/muffins.jpg";
import GarlicBread from "./assets/bakedgoods/garlicbread.jpg";
import StuffedPeppers from "./assets/vegetarian/stuffedpeppers.jpg";
import CauliflowerSteak from "./assets/vegetarian/cauliflowersteak.jpg";
import VegetableKabobs from "./assets/vegetarian/vegetablekabobs.jpg";
import Tofu from "./assets/vegetarian/tofu.jpg";
import Nachos from "./assets/snacks/nachos.jpg";
import Popcorn from "./assets/snacks/popcorn.jpg";
import PotatoChips from "./assets/snacks/potatochips.jpg";
import MozzarellaSticks from "./assets/snacks/mozzarellasticks.jpg";
import ApplePie from "./assets/desserts/applepie.jpg";
import ChocolateCake from "./assets/desserts/chocolatecake.jpg";
import Cheesecake from "./assets/desserts/cheesecake.jpg";
import Donuts from "./assets/desserts/donuts.jpg";


function App() {
  const [tempUnit, setTempUnit] = useState(() => {
    return localStorage.getItem("tempUnit") || "C";
  });

  const getDefaultOvenTemp = () => {
    const unit = localStorage.getItem("tempUnit") || "C";
    return unit === "F" ? 356 : 180; // 356°F is roughly equivalent to 180°C
  };

  const [ovenTemp, setOvenTemp] = useState(getDefaultOvenTemp);
  const [ovenTime, setOvenTime] = useState(60);
  const [airfryerTemp, setAirfryerTemp] = useState(0);
  const [airfryerTime, setAirfryerTime] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  const [selectedDishName, setSelectedDishName] = useState("");
  const [isCustomSetting, setIsCustomSetting] = useState(false);
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);
  const [selectedDishInstructions, setSelectedDishInstructions] = useState("");
  const [selectedDishImage, setSelectedDishImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // New state for managing selected category
  const toast = useToast();

  useEffect(() => {
    // Display the alert as a toast on initial load
    toast({
      title: "Cooking times may vary",
      description:
        "Cooking times may vary depending on your specific airfryer model. Please use the settings below as a guideline and adjust as necessary.",
      status: "warning",
      duration: 5000, // Duration in milliseconds; 9000 for 9 seconds
      isClosable: true,
      position: "top", // Display at the top
    });
  }, [toast]);

  const bgColor = { light: "white", dark: "blue.900" };
  const primaryTextColor = { light: "gray.800", dark: "gray.800" };
  const secondaryTextColor = { light: "gray.800", dark: "gray.50" };
  const accentColorSecondary = { light: "lime.500", dark: "lime.300" };

  const foodCategories = React.useMemo(
    () => ({
      Poultry: [
        {
          key: "chicken_roast",
          displayName: "Chicken Roast",
          temp: 200,
          time: 60,
          image: ChickenRoast,
          instructions:
            "Place chicken in the air fryer basket. Cook at {temp} for {time} minutes, flipping halfway through.",
        },
        {
          key: "turkey",
          displayName: "Turkey",
          temp: 180,
          time: 90,
          image: Turkey,
          instructions:
            "Cook the turkey in the air fryer at {temp} for {time} minutes. Check internal temperature reaches 75°C.",
        },
        {
          key: "duck",
          displayName: "Duck",
          temp: 180,
          time: 80,
          image: Duck,
          instructions:
            "Air fry duck at {temp} for {time} minutes. Ensure skin is crispy and internal temperature is safe.",
        },
        {
          key: "chicken_wings",
          displayName: "Chicken Wings",
          temp: 190,
          time: 25,
          image: ChickenWings,
          instructions:
            "Cook wings at {temp} for {time} minutes, turning them halfway through the cooking time.",
        },
        {
          key: "fried_chicken",
          displayName: "Fried Chicken",
          temp: 180,
          time: 20,
          image: FriedChicken,
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
          image: Shrimp,
          instructions:
            "Cook shrimp at {temp} for {time} minutes, until pink and cooked through.",
        },
        {
          key: "cod",
          displayName: "Cod",
          temp: 180,
          time: 15,
          image: Cod,
          instructions:
            "Place cod fillets in the basket, cook at {temp} for {time} minutes until flaky.",
        },
        {
          key: "salmon_fillets",
          displayName: "Salmon Fillets",
          temp: 180,
          time: 12,
          image: Salmon,
          instructions:
            "Air fry salmon at {temp} for {time} minutes, or until it easily flakes with a fork.",
        },
        {
          key: "tuna_steaks",
          displayName: "Tuna Steaks",
          temp: 190,
          time: 8,
          image: Tuna,
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
          image: BeefRoast,
          instructions:
            "Cook the beef roast in the air fryer at {temp} for {time} minutes. Turn halfway through cooking. Ensure the internal temperature reaches at least 63°C for medium-rare.",
        },
        {
          key: "lamb_chops",
          displayName: "Lamb Chops",
          temp: 200,
          time: 25,
          image: LambChops,
          instructions:
            "Air fry lamb chops at {temp} for {time} minutes, turning once halfway through. Aim for an internal temperature of 63°C for medium-rare.",
        },
        {
          key: "pork_loin",
          displayName: "Pork Loin",
          temp: 190,
          time: 60,
          image: PorkLoin,
          instructions:
            "Place pork loin in the air fryer. Cook at {temp} for {time} minutes, flipping halfway. Check that internal temperature reaches at least 71°C.",
        },
        {
          key: "ribs",
          displayName: "Ribs",
          temp: 200,
          time: 40,
          image: Ribs,
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
          image: BananaBread,
          instructions:
            "Air fry banana bread at {temp} for {time} minutes. Check doneness with a toothpick inserted into the center coming out clean.",
        },
        {
          key: "sourdough",
          displayName: "Sourdough",
          temp: 220,
          time: 30,
          image: Sourdough,
          instructions:
            "Place sourdough loaf in the air fryer. Cook at {temp} for {time} minutes until the crust is golden and sounds hollow when tapped.",
        },
        {
          key: "muffins",
          displayName: "Muffins",
          temp: 180,
          time: 20,
          image: Muffins,
          instructions:
            "Cook muffins at {temp} for {time} minutes, or until a toothpick comes out clean. Allow to cool before serving.",
        },
        {
          key: "garlic_bread",
          displayName: "Garlic Bread",
          temp: 175,
          time: 10,
          image: GarlicBread,
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
          image: StuffedPeppers,
          instructions:
            "Cook stuffed peppers at {temp} for {time} minutes, until peppers are tender and filling is heated through.",
        },
        {
          key: "cauliflower_steak",
          displayName: "Cauliflower Steak",
          temp: 200,
          time: 20,
          image: CauliflowerSteak,
          instructions:
            "Air fry cauliflower steaks at {temp} for {time} minutes, flipping halfway through, until edges are crispy and browned.",
        },
        {
          key: "vegetable_kabobs",
          displayName: "Vegetable Kabobs",
          temp: 180,
          time: 15,
          image: VegetableKabobs,
          instructions:
            "Cook vegetable kabobs at {temp} for {time} minutes, turning occasionally, until vegetables are tender and slightly charred.",
        },
        {
          key: "tofu",
          displayName: "Tofu",
          temp: 180,
          time: 15,
          image: Tofu,
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
          image: Nachos,
          instructions:
            "Layer nachos in the air fryer basket. Cook at {temp} for {time} minutes until cheese is melted and chips are crispy.",
        },
        {
          key: "popcorn",
          displayName: "Popcorn",
          temp: 190,
          time: 15,
          image: Popcorn,
          instructions:
            "Place popcorn kernels in a suitable container or use air fryer popcorn accessories. Cook at {temp} for {time} minutes or until popping slows.",
        },
        {
          key: "potato_chips",
          displayName: "Potato Chips",
          temp: 190,
          time: 10,
          image: PotatoChips,
          instructions:
            "Cook potato chips at {temp} for {time} minutes, shaking the basket halfway through until chips are crispy and golden.",
        },
        {
          key: "mozzarella_sticks",
          displayName: "Mozzarella Sticks",
          temp: 200,
          time: 8,
          image: MozzarellaSticks,
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
          image: ApplePie,
          instructions:
            "Cook apple pie at {temp} for {time} minutes, until the crust is golden and the filling is bubbly.",
        },
        {
          key: "chocolate_cake",
          displayName: "Chocolate Cake",
          temp: 180,
          time: 30,
          image: ChocolateCake,
          instructions:
            "Air fry chocolate cake at {temp} for {time} minutes. Check doneness with a toothpick coming out clean.",
        },
        {
          key: "cheesecake",
          displayName: "Cheesecake",
          temp: 160,
          time: 30,
          image: Cheesecake,
          instructions:
            "Cook cheesecake at {temp} for {time} minutes until the edges are set but the center is slightly wobbly.",
        },
        {
          key: "donuts",
          displayName: "Donuts",
          temp: 180,
          time: 10,
          image: Donuts,
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

    const ovenTempUpdated = tempUnit === "C" ? temp : celsiusToFahrenheit(temp);
    // Convert calculatedTemp back to the current unit if needed
    const displayTemp =
      tempUnit === "C"
        ? calculatedTemp
        : Math.round(celsiusToFahrenheit(calculatedTemp));

    // Dynamic replacement with the new placeholders, including the unit next to the temperature
    const dynamicInstructions = instructions
      .replace(/\{temp\}/g, `${displayTemp}°${tempUnit}`) // Now includes the unit
      .replace(/\{time\}/g, calculatedTime);

    setOvenTemp(ovenTempUpdated);
    setOvenTime(time);
    setAirfryerTemp(calculatedTemp);
    setAirfryerTime(calculatedTime);
    setSelectedDishImage(dish.image);
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

  const renderDishesForCategory = (category) => {
    // Ensure dishes are only rendered when a category is selected
    if (!category) return null; // Early return if no category is selected

    const dishes = foodCategories[category];
    return dishes.map((dish) => (
      <GridItem w="100%" key={dish.key}>
        <Box
          as="button"
          position="relative"
          w="100px" // Adjust width as needed
          h="100px" // Adjust height as needed
          p={0}
          rounded="md"
          overflow="hidden" // Ensure the background does not bleed outside the rounded corners
          onClick={() => selectFood(dish)}
        >
          {/* Background Box with Blur */}
          <Box
            w="full"
            h="full"
            position="absolute"
            top="0"
            left="0"
            backgroundImage={`url(${dish.image})`}
            backgroundSize="cover"
            backgroundPosition="center"
            filter="blur(0.7px)" // Adjust the blur intensity as needed
            zIndex="0"
          ></Box>

          {/* Content Box */}
          <Box
            position="relative"
            w="full"
            h="full"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={4}
            zIndex="8"
            bg={accentColorSecondary[colorMode]}
          >
            <Text
              textAlign="center"
              fontWeight="bold"
              color={primaryTextColor[colorMode]}
              bg="rgba(255, 255, 255, 0.7)"
              borderRadius="md"
            >
              {dish.displayName}
            </Text>
          </Box>
        </Box>
      </GridItem>
    ));
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
    <Box p={5} bg={bgColor[colorMode]} minH="100vh">
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

        <Text
          fontSize="2xl"
          fontWeight="bold"
          color={secondaryTextColor[colorMode]}
        >
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
          bg={bgColor[colorMode]}
          p={4}
          boxShadow="0 -2px 10px rgba(0, 0, 0, 0.1)"
          zIndex="banner"
          color={secondaryTextColor[colorMode]}
          onClick={toggleFooter}
        >
          <VStack spacing={1}>
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

            {/* Flex container for GIF and text */}
            <Flex width="100%" justifyContent="flex-start" alignItems="center">
              {selectedDishName && (
                <Image
                  src={selectedDishImage}
                  boxSize="100px"
                  alt="Selected dish image"
                  marginRight="auto"
                  rounded="md"
                />
              )}{" "}
              {/* GIF to the left */}
              <Text fontSize="md" marginLeft="-14" marginRight="auto">
                {" "}
                {/* Text centered */}
                Air fry for {airfryerTime} minutes at {airfryerTemp}°{tempUnit}
              </Text>
            </Flex>

            <Collapse in={isFooterExpanded} animateOpacity>
              <Box
                p={4}
                bg={accentColorSecondary[colorMode]}
                color={secondaryTextColor[colorMode]}
                w="full"
                rounded="md"
              >
                {/* Placeholder for detailed instructions. */}
                <Text>{selectedDishInstructions}</Text>
              </Box>
            </Collapse>
          </VStack>
        </Box>

        <Flex wrap="wrap" justifyContent="center" gap={2}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={secondaryTextColor[colorMode]}
            textAlign="center"
            w="full"
            mb={4}
          >
            Select a Dish to Air Fry
          </Text>
          {Object.keys(foodCategories).map((category) => (
            <Tag
              size="lg"
              key={category}
              borderRadius="full"
              variant="solid"
              colorScheme="teal"
              onClick={() => setSelectedCategory(category)}
              cursor="pointer"
            >
              <TagLabel>{category}</TagLabel>
              {selectedCategory === category && <Icon as={FaCheck} ml={2} />}
            </Tag>
          ))}
        </Flex>
        {selectedCategory && (
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {renderDishesForCategory(selectedCategory)}
          </Grid>
        )}
      </VStack>
    </Box>
  );
}

export default App;
