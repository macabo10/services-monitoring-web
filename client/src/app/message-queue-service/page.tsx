'use client';

import Header from "../../components/Header";
import ContainerInfo from "@/components/ContainerInfo";
import { MonitoringInfo } from "@/components/ContainerInfo";

import { useEffect, useState } from 'react';

function ExchangeRateService() {
  const GENERAL_API = process.env.NEXT_PUBLIC_BACKEND_URL + '/general/3';
  const [monitoringInfos, setMonitoringInfos] = useState<MonitoringInfo[]>([]);

  useEffect(() => {
    async function fetchMonitoringInfos() {
      try {
        const response = await fetch(GENERAL_API, {
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
    const intervalId = setInterval(fetchMonitoringInfos, 5000);
    return () => clearInterval(intervalId);
    
  }, []);

  return (
    <>
      <Header content={"MESSAGE QUEUE SERVICE"}/>
    {monitoringInfos.map(info => (
      <ContainerInfo key={info.containerID.id} containerName={info.containerID.id} info={info} haveAPI={true} />
    ))}
    </>
  );
}

export default ExchangeRateService;