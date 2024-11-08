'use client';

import Header from "../../components/Header";
import ContainerInfo, {MonitoringInfo} from "@/components/ContainerInfo";

import { useEffect, useState } from 'react';


function ExchangeRateService() {

  const [monitoringInfo, setMonitoringInfo] = useState<MonitoringInfo>({
    container: { status: false },
    api: { status: false },
    userCapacity: { in: 0, out: 0 },
    cpu: { usage: 0 },
    ram: { usage: 0, used: 0, max: 0 },
    network: { speed: 0 },
  });
  
  useEffect(() => {
    async function fetchMonitoringInfo() {
      try {
        const response = await fetch('/api/monitoring-info');
        const data = await response.json();
        setMonitoringInfo(data);
      } catch (error) {
        console.error('Error fetching monitoring info:', error);
      }
    }
  
    fetchMonitoringInfo();
    const intervalId = setInterval(fetchMonitoringInfo, 10000);
  
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Header content={"EXCHANGE RATE SERVICE"}/>
      <ContainerInfo containerName={"Exchange Rate Service Container 1"} info={monitoringInfo}/>
    </>
  );
}

export default ExchangeRateService;