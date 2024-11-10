'use client'

import Header from "../../components/Header";

import ContainerInfo, {MonitoringInfo} from "../../components/ContainerInfo";
import { useEffect, useState } from "react";

export default function GoldPriceService() {

  const [monitoringInfo, setMonitoringInfo] = useState<MonitoringInfo>({
    containerID: { id: 'Gold price service 1' },
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
        const response = await fetch('/routes/monitoring-info');
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
      <Header content={"GOLD PRICE SERVICE"}/>
      <ContainerInfo containerName={monitoringInfo.containerID.id} info={monitoringInfo}/>
    </>
  );
}
