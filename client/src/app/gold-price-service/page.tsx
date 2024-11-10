'use client'

import Header from "../../components/Header";

import ContainerInfo, {MonitoringInfo} from "../../components/ContainerInfo2";
import { useEffect, useState } from "react";

export default function GoldPriceService() {

  const [monitoringInfos, setMonitoringInfos] = useState<MonitoringInfo[]>([]);

  useEffect(() => {
    async function fetchMonitoringInfos() {
      try {
        const response = await fetch('http://localhost:3001/test-monitoring-info/gold-price-service', {
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
      <Header content={"GOLD PRICE SERVICE"}/>
      {monitoringInfos.map(info => (
      <ContainerInfo key={info.containerID.id} containerName={info.containerID.id} info={info} />
    ))}
    </>
  );
}
