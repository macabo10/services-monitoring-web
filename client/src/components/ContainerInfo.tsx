'use client';

import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import CardService from './CardService';

type ContainerStatus = { status: boolean };
type APIStatus = { status: boolean };
type UserCapacity = { in: number; out: number };
type CPU = { usage: number };
type RAM = { usage: number, used: number; max: number };
type Network = { speed: number };

interface MonitoringInfo {
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
    <>
      <Typography variant="body1" color={cpu.usage <= 80 ? 'green' : 'red'}>
        CPU: {cpu.usage}% usage
      </Typography>
    </>
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

  return (
    <>
      <Box sx={{ textAlign: 'left', margin: theme.spacing(2), color: theme.palette.secondary.main }}>
        <Typography variant="h4">{containerName}</Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0.5} margin={0.5}>
          <Grid size={{ xs: 6, md: 2 }}>
            <CardService title="Container">
              {info && <ContainerStatus containerStatus={info.container}/>}
            </CardService>
          </Grid>
          <Grid size={{ xs: 6, md: 2 }}>
            <CardService title="Endpoint API">
              {info && <APIStatus apiStatus={info.api}/>}
            </CardService>
          </Grid>
          <Grid size={{ xs: 6, md: 2 }}>
            <CardService title="User capacity">
              {info && <UserCapacity userCapacity={info.userCapacity}/>}
            </CardService>
          </Grid>
          <Grid size={{ xs: 6, md: 2 }}>
            <CardService title="CPU">
              {info && <CPU cpu={info.cpu}/>}
            </CardService>
          </Grid>
          <Grid size={{ xs: 6, md: 2 }}>
            <CardService title="RAM">
              {info && <RAM ram={info.ram}/>}
            </CardService>
          </Grid>
          <Grid size={{ xs: 6, md: 2 }}>
            <CardService title="Network">
              {info && <Network network={info.network}/>}
            </CardService>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContainerInfo;
export type { MonitoringInfo };