'use client'

import Header from "../../components/Header";

import { useTheme } from "@mui/material/styles";
import ContainerInfo from "../../components/ContainerInfo";

export default function GoldPriceService() {
  const theme = useTheme();
  return (
    <>
      <Header content={"GOLD PRICE SERVICE"}/>
      <ContainerInfo containerName={"Gold Price Service Container 1"}/>
    </>
  );
}
