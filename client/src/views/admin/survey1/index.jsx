
import {
  MdEdit,
  MdRemoveRedEye,
} from "react-icons/md";
import {
  Box,
  Icon,
  Input,
  SimpleGrid,
  useColorModeValue, } from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import VolunteerHoursPieChart from "./components/VolunteerHoursPieChart";
import VolunteerHoursBarChart from "./components/VolunteerHoursBarChart";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import banner from "assets/img/auth/banner.png";

import { Button, Flex, Link, Text } from "@chakra-ui/react";

export default function Settings() {

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [llmanswer, setllmanswer] = useState(null);
  
  useEffect(() => {
    setllmanswer("There are 100 volunteers");
  }, []);
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

<SimpleGrid
        columns={{ base: 1, md: 1, lg: 1, "2xl": 1 }}
        gap='20px'
        mb='20px'>
<Flex
      direction='column'
      bgImage={banner}
      bgSize='cover'
      py={{ base: "30px", md: "56px" }}
      px={{ base: "30px", md: "64px" }}
      borderRadius='30px'>
      <Text
        fontSize={{ base: "24px", md: "34px" }}
        color='white'
        mb='14px'
        maxW={{
          base: "100%",
          md: "64%",
          lg: "46%",
          xl: "70%",
          "2xl": "50%",
          "3xl": "42%",
        }}
        fontWeight='700'
        lineHeight={{ base: "32px", md: "42px" }}>
        Give Natural Language Query!
      </Text>
      <Input
          isRequired={true}
          variant='auth'
          fontSize='sm'

          ms={{ base: "0px", md: "0px" }}
          type='email'
          placeholder='How many volunteers are there?'
          mb='24px'
          fontWeight='500'
          size='lg'
          color='white'
        />
      {
        llmanswer && <Text color='white' fontWeight='bold' fontSize='xl' mb='20px'>{llmanswer}</Text>
      }
      <Flex align='center'>
        <Button
          bg='white'
          color='black'
          _hover={{ bg: "whiteAlpha.900" }}
          _active={{ bg: "white" }}
          _focus={{ bg: "white" }}
          fontWeight='500'
          fontSize='14px'
          py='20px'
          px='27'
          me='38px'>
          Get Answer
        </Button>
      </Flex>
    </Flex>
    </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2, "2xl": 2 }}
        gap='20px'
        mb='20px'>


        
        <div onClick={() => window.open("https://forms.gle/aSLSrj4p9Y2ugSRA9")}>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdEdit} color={brandColor} />
              }
            />
          }
          name=''
          value='Edit Survey Form'
          
        />
        </div>
        <div onClick={() => window.open("https://docs.google.com/spreadsheets/d/1i6ZF2sleWPuZp7veKNiuQnQQ59Q7xqLFjiegvyTgzyM/edit?usp=sharing")}>
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={
                  <Icon w='32px' h='32px' as={MdRemoveRedEye} color={brandColor} />
                }
              />
            }
            name=''
            value='View Data'
            
          />
        </div>
      </SimpleGrid>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>

      <VolunteerHoursPieChart/>
      <VolunteerHoursBarChart/>

     

      
       
      </SimpleGrid>
    </Box>
  );
}
