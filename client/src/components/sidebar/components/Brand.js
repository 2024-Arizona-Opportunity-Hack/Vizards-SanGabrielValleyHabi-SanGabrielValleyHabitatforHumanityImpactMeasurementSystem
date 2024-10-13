import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";
import logo from "/Users/sahilhadke/Desktop/PROJECTS/Vizards-SanGabrielValleyHabi-SanGabrielValleyHabitatforHumanityImpactMeasurementSystem/client/src/assets/img/black-logo.png"

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import { Image } from "@chakra-ui/react";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");
  let logoBg = useColorModeValue("white", "navy.800");
  

  // add png



  return (
    <Flex align='center' direction='column'>
      <img src={logo} alt="Horizon Logo" style={{ width: '200px', height: 'auto', padding: '5px', marginBottom: '10px' }} />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
