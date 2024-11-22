'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DashboardCard from './DashboardCard';
import { useEffect, useState } from 'react';
import { MonitoringInfo } from "@/components/ContainerInfo";


const testData = [
  {
    siteName: 'GOLD PRICE SERVICE',
    containers: [
      {
        title: 'Container no. 1',
        metrics: [
          { title: 'Container Status', value: 'running' },
          { title: 'Endpoint Status', value: 'running' },
          { title: 'API', value: 'localhost:3008' },
        ],
      },
      {
        title: 'Container no. 2',
        metrics: [
          { title: 'Container Status', value: 'running' },
          { title: 'Endpoint Status', value: 'running' },
          { title: 'API', value: 'localhost:3009' },
        ],
      },
    ],
    path: 'gold-price-service',
  },
  {
    siteName: 'EXCHANGE RATE SERVICE',
    containers: [
      {
        title: 'Container no. 1',
        metrics: [
          { title: 'Container Status', value: 'running' },
          { title: 'Endpoint Status', value: 'running' },
          { title: 'API', value: 'localhost:3004' },
        ],
      },
      {
        title: 'Container no. 2',
        metrics: [
          { title: 'Container Status', value: 'running' },
          { title: 'Endpoint Status', value: 'running' },
          { title: 'API', value: 'localhost:3005' },
        ],
      },
    ],
    path: 'exchange-rate-service',
  },
  {
    siteName: 'MESSAGE QUEUE',
    containers: [
      {
        title: 'Container no. 1',
        metrics: [
          { title: 'Container Status', value: 'running' },
          { title: 'Endpoint Status', value: 'running' },
          { title: 'API', value: 'localhost:5001' },
        ],
      },
    ],
    path: '',
  },
];

export default function DashboardGrid() {
  const GENERAL_MESSAGE_QUEUE_API = process.env.NEXT_PUBLIC_BACKEND_URL + '/general/3';
  const GENERAL_GOLD_PRICE_API = process.env.NEXT_PUBLIC_BACKEND_URL + '/general/2';
  const GENERAL_EXCHANGE_RATE_API = process.env.NEXT_PUBLIC_BACKEND_URL + '/general/1';

  const [messageQueueInfos, setMessageQueueInfos] = useState<MonitoringInfo[]>([]);
  const [exchangeRateInfos, setExchangeRateInfos] = useState<MonitoringInfo[]>([]);
  const [goldPriceInfos, setGoldPriceInfos] = useState<MonitoringInfo[]>([]);

  useEffect(() => {
    async function fetchServiceMonitoringInfos(url: string) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching monitoring infos:', error);
      }
    }

    async function fetchDashboardMonitoringInfos() {
      setMessageQueueInfos(await fetchServiceMonitoringInfos(GENERAL_MESSAGE_QUEUE_API));
      setExchangeRateInfos(await fetchServiceMonitoringInfos(GENERAL_EXCHANGE_RATE_API));
      setGoldPriceInfos(await fetchServiceMonitoringInfos(GENERAL_GOLD_PRICE_API));
    }

    fetchDashboardMonitoringInfos();
    const intervalId = setInterval(fetchDashboardMonitoringInfos, 5000);
    return () => clearInterval(intervalId);

  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container direction="column" spacing={2}>
        {/* {testData.map((data, index) => (
          <Grid item key={index}>
            <DashboardCard siteName={data.siteName} containers={data.containers} path={data.path}/>
          </Grid>
        ))} */}

        <Grid item>
          <DashboardCard siteName="MESSAGE QUEUE" containers={messageQueueInfos} path="message-queue-service" />
        </Grid>
        <Grid item>
          <DashboardCard siteName="EXCHANGE RATE SERVICE" containers={exchangeRateInfos} path="exchange-rate-service" />
        </Grid>
        <Grid item>
          <DashboardCard siteName="GOLD PRICE SERVICE" containers={goldPriceInfos} path="gold-price-service" />
        </Grid>
      </Grid>
    </Box>
  );
}