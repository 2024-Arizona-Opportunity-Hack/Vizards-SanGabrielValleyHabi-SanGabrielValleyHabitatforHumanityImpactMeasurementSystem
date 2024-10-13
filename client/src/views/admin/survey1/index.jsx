/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// Chakra imports
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
  MdEdit,
  MdRemoveRedEye,
} from "react-icons/md";
import { Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue, } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/survey1/components/DevelopmentTable";
import CheckTable from "views/admin/survey1/components/CheckTable";
import ColumnsTable from "views/admin/survey1/components/ColumnsTable";
import ComplexTable from "views/admin/survey1/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/survey1/variables/columnsData";
import tableDataDevelopment from "views/admin/survey1/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/survey1/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/survey1/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/survey1/variables/tableDataComplex.json";
import React from "react";
import VolunteerHoursPieChart from "./components/VolunteerHoursPieChart";
import VolunteerHoursBarChart from "./components/VolunteerHoursBarChart";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
export default function Settings() {

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
