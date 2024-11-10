'use client';

import Header from "../../components/Header";
import ContainerInfo, {MonitoringInfo} from "@/components/ContainerInfo";

import { useEffect, useState } from 'react';

function ExchangeRateService() {

  const [monitoringInfos, setMonitoringInfos] = useState<MonitoringInfo[]>([]);

  useEffect(() => {
    async function fetchMonitoringInfos() {
      try {
        const response = await fetch('/api/monitoring-info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setMonitoringInfos(data);
      } catch (error) {
        console.error('Error fetching monitoring info:', error);
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