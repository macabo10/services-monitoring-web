import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DashboardCard from './DashboardCard'; 

const testData = [
  {
    siteName: 'GOLD PRICE SERVICE',
    containers: [
      {
        title: 'Container no. 1',
        metrics: [
          { title: 'Container Status', value: 'running' },
          { title: 'Endpoint Status', value: 'running' },
          { title: 'API', value: 'localhost:3008'},
        ],
      },
      {
        title: 'Container no. 2',
        metrics: [
            { title: 'Container Status', value: 'running' },
            { title: 'Endpoint Status', value: 'running' },
            { title: 'API', value: 'localhost:3009'},
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
          { title: 'API', value: 'localhost:3004'},
        ],
      },
      {
        title: 'Container no. 2',
        metrics: [
            { title: 'Container Status', value: 'running' },
            { title: 'Endpoint Status', value: 'running' },
            { title: 'API', value: 'localhost:3005'},
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
          { title: 'API', value: 'localhost:5001'},
        ],
      },
    ],
    path: '',
  },
];

export default function DashboardGrid() {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container direction="column" spacing={2}>
        {testData.map((data, index) => (
          <Grid item key={index}>
            <DashboardCard siteName={data.siteName} containers={data.containers} path={data.path}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}