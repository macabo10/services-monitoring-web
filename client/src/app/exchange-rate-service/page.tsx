'use client';

import Header from "../../components/Header";
import ContainerInfo from "@/components/ContainerInfo";
import { MonitoringInfo } from "@/components/ContainerInfo";

import { useEffect, useState } from 'react';

function ExchangeRateService() {

  const [monitoringInfos, setMonitoringInfos] = useState<MonitoringInfo[]>([]);

  useEffect(() => {
    async function fetchMonitoringInfos() {
      try {
        const response = await fetch('http://localhost:4001/general/1', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Monitoring infos:', data);
        setMonitoringInfos(data);
      } catch (error) {
        console.error('Error fetching monitoring infos:', error);
      }
    }

    fetchMonitoringInfos();
    const intervalId = setInterval(fetchMonitoringInfos, 10000);
    return () => clearInterval(intervalId);
    
  }, []);

  return (
    <>
      <Header content={"EXCHANGE RATE SERVICE"}/>
    {monitoringInfos.map(info => (
      <ContainerInfo key={info.containerID.id} containerName={info.containerID.id} info={info} />
    ))}
    </>
  );
}

export default ExchangeRateService;