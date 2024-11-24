'use client';

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CardService from './CardService';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { ContainerID, ContainerStatus, APIStatus, UserCapacity, CPU, RAM, Network } from '@/components/MonitoringInfo';
import MonitoringInfo from '@/components/MonitoringInfo';

const ContainerStatus = ({ containerStatus }: { containerStatus: ContainerStatus }) => {
  const theme = useTheme();
  const status = containerStatus.status ? 'up' : 'down';
  return (
    <Typography variant="body1" color={status === 'up' ? 'green' : 'red'}>
      Container is {status}
    </Typography>
  );
};

const APIStatus = ({ apiStatus }: { apiStatus: APIStatus }) => {
  const theme = useTheme();
  const status = apiStatus.status ? 'up' : 'down';
  return (
    <Typography variant="body1" color={status === 'up' ? 'green' : 'red'}>
      API is {status}
    </Typography>
  );
};

const UserCapacity = ({ userCapacity }: { userCapacity: UserCapacity }) => {
  const theme = useTheme();
  return (
    <Typography variant="body1" color={theme.palette.secondary.main}>
      Requests: {userCapacity.in}, Responses: {userCapacity.out}
    </Typography>
  );
}

const CPU = ({ cpu }: { cpu: CPU }) => {
  return (
    <Typography variant="body1" color={cpu.usage <= 80 ? 'green' : 'red'}>
      CPU: {cpu.usage}% usage
    </Typography>
  );
}

const RAM = ({ ram }: { ram: RAM }) => {
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

const Network = ({ network }: { network: Network }) => {
  const theme = useTheme();
  return (
    <Typography variant="body1" color={theme.palette.secondary.main}>
      Network: {network.in} {network.unit} in, {network.out} {network.unit} out
    </Typography>
  );
}

const ContainerInfo = ({ containerName, info, haveAPI }: { containerName?: string, info: MonitoringInfo, haveAPI?: boolean }) => {
  const theme = useTheme();

  const fetchContainerDetail = async (containerID: ContainerID) => {

    const DETAIL_CONTAINER_STATUS_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/detail/container_status/' + containerID.id;
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(DETAIL_CONTAINER_STATUS_URL, {
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
        <Typography color={theme.palette.secondary.main}>Created: {data.created_at}</Typography>
        <Typography color={theme.palette.secondary.main}>Last down time: {data.checked_at}</Typography>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.status_data}>
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
    const DETAIL_API_STATUS_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/detail/api_status/' + containerID.id;
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(DETAIL_API_STATUS_URL, {
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
        <Typography color={theme.palette.secondary.main}>Last Gold API down time: {data.gold_down_at}</Typography>
        <Typography color={theme.palette.secondary.main}>Last Exchange API down time: {data.exchange_down_at}</Typography>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.status_data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="gold_down_count" stroke="#82ca9d" />
              <Line type="monotone" dataKey="exchange_down_count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };

  const fetchUserCapacityDetail = async (containerID: ContainerID) => {
    const DETAIL_USER_CAPACITY_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/detail/user_capacity/' + containerID.id;
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(DETAIL_USER_CAPACITY_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    let data = await response.json();
    console.log(data);

    return (
      <Box>
        <Typography color={theme.palette.secondary.main} variant="h6">User Capacity Details</Typography>
        <Typography color={theme.palette.secondary.main}>Peak requests: {data.max_request.incoming_requests} at {data.max_request.checked_at}</Typography>
        <Typography color={theme.palette.secondary.main}>Peak responses: {data.max_response.outgoing_responses} at {data.max_response.checked_at}</Typography>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.user_capacity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="checked_at" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="incoming_requests" stroke="#8884d8" />
              <Line type="monotone" dataKey="outgoing_responses" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };

  const fetchCpuDetail = async (containerID: ContainerID) => {
    const DETAIL_CPU_STATUS_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/detail/cpu/' + containerID.id;
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(DETAIL_CPU_STATUS_URL, {
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
        <Typography color={theme.palette.secondary.main}>Highest CPU Usage In The Last 5 Days: {data.max_cpu.cpu_percentage + '%'} at {data.max_cpu.checked_at}</Typography>
        <Typography color={theme.palette.secondary.main}>Average CPU Usage Today: {data.avg_cpu + '%'}</Typography>

        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.cpu_data}>
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
    const DETAIL_RAM_STATUS_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/detail/memory/' + containerID.id;
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(DETAIL_RAM_STATUS_URL, {
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
        <Typography color={theme.palette.secondary.main}>Highest RAM Usage In The Last 5 Days: {data.max_memory.memory_usage + data.max_memory.unit} at {data.max_memory.checked_at}</Typography>
        <Typography color={theme.palette.secondary.main}>Average RAM Usage Today: {data.avg_memory.memory_usage + data.avg_memory.unit}</Typography>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.memory_data}>
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
    const DETAIL_NETWORK_STATUS_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/detail/network/' + containerID.id;
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(DETAIL_NETWORK_STATUS_URL, {
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
        <Typography color={theme.palette.secondary.main}>Total received in the last day: {data.daily_io.total_received + data.daily_io.unit}</Typography>
        <Typography color={theme.palette.secondary.main}>Total sent in the last day: {data.daily_io.total_sent + data.daily_io.unit}</Typography>
        <Box sx={{ width: '100%', height: 400, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.network_data}>
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
          {info && <ContainerStatus containerStatus={info.container} />}
        </CardService>
        {haveAPI && (
          <CardService
            title="Endpoint API"
            onFetchDetail={() => fetchApiDetail(info.containerID)}
          >
            {info && <APIStatus apiStatus={info.api} />}
          </CardService>
        )}
        <CardService
          title="User capacity"
          onFetchDetail={() => fetchUserCapacityDetail(info.containerID)}
        >
          {info && <UserCapacity userCapacity={info.userCapacity} />}
        </CardService>
        <CardService
          title="CPU"
          onFetchDetail={() => fetchCpuDetail(info.containerID)}
        >
          {info && <CPU cpu={info.cpu} />}
        </CardService>
        <CardService
          title="RAM"
          onFetchDetail={() => fetchRamDetail(info.containerID)}
        >
          {info && <RAM ram={info.ram} />}
        </CardService>
        <CardService
          title="Network"
          onFetchDetail={() => fetchNetworkDetail(info.containerID)}
        >
          {info && <Network network={info.network} />}
        </CardService>
      </Grid>
    </Box>
  );
};

export default ContainerInfo;
export type { MonitoringInfo };