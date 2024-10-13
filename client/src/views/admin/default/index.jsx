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
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import React, {useEffect} from "react";
import offwhite from "../../../assets/img/logo-offwhite.png";
import { useNavigate } from "react-router-dom";

export default function UserReports() {

  const navigate = useNavigate();
  // Chakra Color Mode
  useEffect(() => {
    navigate('/admin/survey1');
  }, []);
  return (
    <>
      <img src={offwhite} alt="offwhite" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxWidth: "500px", zIndex: "-1" }} />  
    </>
  );
}
