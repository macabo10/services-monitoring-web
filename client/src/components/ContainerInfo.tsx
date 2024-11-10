'use client';

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CardService from './CardService';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type ContainerID = { id: string };
type ContainerStatus = { status: boolean };
type APIStatus = { status: boolean };
type UserCapacity = { in: number; out: number };
type CPU = { usage: number };
type RAM = { usage: number, used: number; max: number };
type Network = { speed: number };

interface MonitoringInfo {
  containerID: ContainerID;
  container: ContainerStatus;
  api: APIStatus;
  userCapacity: UserCapacity;
  cpu: CPU;
  ram: RAM;
  network: Network;
}

const ContainerStatus = ({containerStatus}: {containerStatus: ContainerStatus}) => {
  const theme = useTheme();
  const status = containerStatus.status ? 'up' : 'down';
  return (
    <Typography variant="body1" color={status === 'up' ? 'green' : 'red'}>
      Container is {status}
    </Typography>
  );
};

const APIStatus = ({apiStatus}: {apiStatus: APIStatus}) => {
  const theme = useTheme();
  const status = apiStatus.status ? 'up' : 'down';
  return (
    <Typography variant="body1" color={status === 'up' ? 'green' : 'red'}>
      API is {status}
    </Typography>
  );
};

const UserCapacity = ({userCapacity}: {userCapacity: UserCapacity}) => {
  const theme = useTheme();
  return (
    <Typography variant="body1" color={theme.palette.secondary.main}>
      User capacity: {userCapacity.in} in, {userCapacity.out} out
    </Typography>
  );
}

const CPU = ({cpu}: {cpu: CPU}) => {
  return (
    <Typography variant="body1" color={cpu.usage <= 80 ? 'green' : 'red'}>
      CPU: {cpu.usage}% usage
    </Typography>
  );
}

const RAM = ({ram}: {ram: RAM}) => {
  const theme = useTheme();
  return (
    <>
      <Typography variant="body1" color={ram.usage <= 80 ? 'green' : 'red'}>
        RAM: {ram.usage}% usage
      </Typography>
      <Typography variant="body1" color={theme.palette.secondary.main}>
        {ram.used} used out of {ram.max}
      </Typography>
    </>  
  );
}

const Network = ({network}: {network: Network}) => {
  const theme = useTheme();
  return (
    <Typography variant="body1" color={theme.palette.secondary.main}>
      Network: {network.speed} mB/s
    </Typography>
  );
}

const ContainerInfo = ({containerName, info}: {containerName?: string, info: MonitoringInfo}) => {
  const theme = useTheme();

  const fetchContainerDetail = async (containerID: ContainerID) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const data = [
      { name: 'Day 1', uptime: 24 },
      { name: 'Day 2', uptime: 48 },
      { name: 'Day 3', uptime: 72 },
      { name: 'Day 4', uptime: 96 },
      { name: 'Day 5', uptime: 120 },
    ];
    return (
      <Box>
        <Typography variant="h6" color={theme.palette.secondary.main}>Container Details</Typography>
        <Typography color={theme.palette.secondary.main}>ID: {info.containerID.id}</Typography>
        <Typography color={theme.palette.secondary.main}>Status: {info.container.status ? "Up" : "Down"}</Typography>
        <Typography color={theme.palette.secondary.main}>Image: ubuntu:latest</Typography>
        <Typography color={theme.palette.secondary.main}>Created: 2023-05-15 10:30:00</Typography>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uptime" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };

  const fetchApiDetail = async (containerID: ContainerID) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const data = [
      { name: '1h', requests: 1000 },
      { name: '2h', requests: 1200 },
      { name: '3h', requests: 800 },
      { name: '4h', requests: 1500 },
      { name: '5h', requests: 2000 },
    ];
    return (
      <Box>
        <Typography color={theme.palette.secondary.main} variant="h6">API Details</Typography>
        <Typography color={theme.palette.secondary.main}>Status: {info.api.status ? "Up" : "Down"}</Typography>
        <Typography color={theme.palette.secondary.main}>Endpoint: https://api.example.com</Typography>
        <Typography color={theme.palette.secondary.main}>Version: v1.2.3</Typography>
        <Typography color={theme.palette.secondary.main}>Last checked: 2 minutes ago</Typography>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="requests" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };

  const fetchUserCapacityDetail = async (containerID: ContainerID) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const data = [
      { name: 'Mon', inbound: 100, outbound: 80 },
      { name: 'Tue', inbound: 120, outbound: 100 },
      { name: 'Wed', inbound: 140, outbound: 110 },
      { name: 'Thu', inbound: 130, outbound: 90 },
      { name: 'Fri', inbound: 150, outbound: 120 },
    ];
    return (
      <Box>
        <Typography color={theme.palette.secondary.main} variant="h6">User Capacity Details</Typography>
        <Typography color={theme.palette.secondary.main}>Inbound: {info.userCapacity.in}</Typography>
        <Typography color={theme.palette.secondary.main}>Outbound: {info.userCapacity.out}</Typography>
        <Typography color={theme.palette.secondary.main}>Peak inbound: 150</Typography>
        <Typography color={theme.palette.secondary.main}>Peak outbound: 120</Typography>
        <Typography color={theme.palette.secondary.main}>Average daily users: 85</Typography>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="inbound" stroke="#8884d8" />
              <Line type="monotone" dataKey="outbound" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };

  const fetchCpuDetail = async (containerID: ContainerID) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const data = [
      { name: '1m', usage: 50 },
      { name: '2m', usage: 60 },
      { name: '3m', usage: 70 },
      { name: '4m', usage: 55 },
      { name: '5m', usage: 65 },
    ];
    return (
      <Box>
        <Typography color={theme.palette.secondary.main} variant="h6">CPU Details</Typography>
        <Typography color={theme.palette.secondary.main}>Usage: {info.cpu.usage}%</Typography>
        <Typography color={theme.palette.secondary.main}>Cores: 4</Typography>
        <Typography color={theme.palette.secondary.main}>Clock speed: 2.5 GHz</Typography>
        <Typography color={theme.palette.secondary.main}>Average load (1m): 0.75</Typography>
        <Typography color={theme.palette.secondary.main}>Average load (5m): 0.60</Typography>
        <Typography color={theme.palette.secondary.main}>Average load (15m): 0.50</Typography>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="usage" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };

  const fetchRamDetail = async (containerID: ContainerID) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const data = [
      { name: '1m', used: 4000 },
      { name: '2m', used: 4200 },
      { name: '3m', used: 4100 },
      { name: '4m', used: 4300 },
      { name: '5m', used: 4150 },
    ];
    return (
      <Box>
        <Typography color={theme.palette.secondary.main} variant="h6">RAM Details</Typography>
        <Typography color={theme.palette.secondary.main}>Usage: {info.ram.usage}%</Typography>
        <Typography color={theme.palette.secondary.main}>Used: {info.ram.used}</Typography>
        <Typography color={theme.palette.secondary.main}>Max: {info.ram.max}</Typography>
        <Typography color={theme.palette.secondary.main}>Free: {info.ram.max - info.ram.used}</Typography>
        <Typography color={theme.palette.secondary.main}>Swap used: 256 MB</Typography>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="used" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };

  const fetchNetworkDetail = async (containerID: ContainerID) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const data = [
      { name: '1m', speed: 10 },
      { name: '2m', speed: 15 },
      { name: '3m', speed: 12 },
      { name: '4m', speed: 18 },
      { name: '5m', speed: 14 },
    ];
    return (
      <Box>
        <Typography color={theme.palette.secondary.main} variant="h6">Network Details</Typography>
        <Typography color={theme.palette.secondary.main}>Speed: {info.network.speed} mB/s</Typography>
        <Typography color={theme.palette.secondary.main}>Total received: 1.5 GB</Typography>
        <Typography color={theme.palette.secondary.main}>Total sent: 500 MB</Typography>
        <Typography color={theme.palette.secondary.main}>Active connections: 25</Typography>
        <Typography color={theme.palette.secondary.main}>IP: 192.168.1.100</Typography>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="speed" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, color: theme.palette.secondary.main }}>{containerName}</Typography>
      <Grid container spacing={2} sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
        <CardService 
          title="Container" 
          onFetchDetail={() => fetchContainerDetail(info.containerID)}
        >
          {info && <ContainerStatus containerStatus={info.container}/>}
        </CardService>
        <CardService 
          title="Endpoint API" 
          onFetchDetail={() => fetchApiDetail(info.containerID)}
        >
          {info && <APIStatus apiStatus={info.api}/>}
        </CardService>
        <CardService 
          title="User capacity" 
          onFetchDetail={() => fetchUserCapacityDetail(info.containerID)}
        >
          {info && <UserCapacity userCapacity={info.userCapacity}/>}
        </CardService>
        <CardService 
          title="CPU" 
          onFetchDetail={() => fetchCpuDetail(info.containerID)}
        >
          {info && <CPU cpu={info.cpu}/>}
        </CardService>
        <CardService 
          title="RAM" 
          onFetchDetail={() => fetchRamDetail(info.containerID)}
        >
          {info && <RAM ram={info.ram}/>}
        </CardService>
        <CardService 
          title="Network" 
          onFetchDetail={() => fetchNetworkDetail(info.containerID)}
        >
          {info && <Network network={info.network}/>}
        </CardService>
      </Grid>
    </Box>
  );
};

export default ContainerInfo;
export type { MonitoringInfo };