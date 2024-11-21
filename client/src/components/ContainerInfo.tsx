'use client';

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CardService from './CardService';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { ContainerID, ContainerStatus, APIStatus, UserCapacity, CPU, RAM, Network } from '@/components/MonitoringInfo';
import MonitoringInfo from '@/components/MonitoringInfo';

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
      {/* User capacity: {userCapacity.in} in, {userCapacity.out} out */}
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
        {ram.used} {ram.unit} used out of {ram.max} {ram.unit}
      </Typography>
    </>  
  );
}

const Network = ({network}: {network: Network}) => {
  const theme = useTheme();
  return (
    <Typography variant="body1" color={theme.palette.secondary.main}>
      Network: {network.in} {network.unit} in, {network.out} {network.unit} out
    </Typography>
  );
}

const ContainerInfo = ({containerName, info, haveAPI}: {containerName?: string, info: MonitoringInfo, haveAPI?: boolean}) => {
  const theme = useTheme();

  const fetchContainerDetail = async (containerID: ContainerID) => {
    // Dummy data
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(`http://localhost:4001/detail/container_status/${containerID.id}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      },
    });
    let data = await response.json();
    console.log(data);

    return (
      <Box>
        <Typography variant="h6" color={theme.palette.secondary.main}>Container Details</Typography>
        <Typography color={theme.palette.secondary.main}>Created: 2023-05-15 10:30:00</Typography>
        <Typography color={theme.palette.secondary.main}>Last down time: 2023-05-15 10:30:00</Typography>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="down_count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };

  const fetchApiDetail = async (containerID: ContainerID) => {
    // Dummy data
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(`http://localhost:4001/detail/api_status/${containerID.id}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      },
    });
    let data = await response.json();
    console.log(data);

    return (
      <Box>
        <Typography color={theme.palette.secondary.main} variant="h6">API Details</Typography>
        <Typography color={theme.palette.secondary.main}>Endpoint: https://api.example.com</Typography>
        <Typography color={theme.palette.secondary.main}>Last checked: 2 minutes ago</Typography>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="down_count" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };

  const fetchUserCapacityDetail = async (containerID: ContainerID) => {
    // Dummy data
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(`/api/container/details`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ containerID: containerID.id }),
    });
  
    let data = await response.json();
    console.log(data);
    
    // Dummy data
    data = [
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
    // Dummy data
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(`http://localhost:4001/detail/cpu/${containerID.id}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      },
    });
  
    let data = await response.json();
    console.log(data);

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
              <XAxis dataKey="checked_at" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cpu_percentage" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };

  const fetchRamDetail = async (containerID: ContainerID) => {
    // Dummy data
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(`http://localhost:4001/detail/memory/${containerID.id}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      },
    });
    let data = await response.json();
    console.log(data);

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
              <XAxis dataKey="checked_at" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="memory_percentage" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };

  const fetchNetworkDetail = async (containerID: ContainerID) => {
    // Dummy data
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(`http://localhost:4001/detail/network/${containerID.id}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      },
    });
    let data = await response.json();
    console.log(data);

    return (
      <Box>
        <Typography color={theme.palette.secondary.main} variant="h6">Network Details</Typography>
        <Typography color={theme.palette.secondary.main}>Total received: 1.5 GB</Typography>
        <Typography color={theme.palette.secondary.main}>Total sent: 500 MB</Typography>
        <Typography color={theme.palette.secondary.main}>Active connections: 25</Typography>
        <Typography color={theme.palette.secondary.main}>IP: 192.168.1.100</Typography>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="checked_at" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="network_in" stroke="#8884d8" />
              <Line type="monotone" dataKey="network_out" stroke="#8884d8" />
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
        {haveAPI && (
          <CardService 
            title="Endpoint API" 
            onFetchDetail={() => fetchApiDetail(info.containerID)}
          >
            {info && <APIStatus apiStatus={info.api}/>}
          </CardService>
        )}
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