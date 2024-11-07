'use client';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import CardService from './CardService';

const ContainerInfo = ({containerName}: {containerName?: string}) => {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ textAlign: 'left', margin: theme.spacing(2), color: theme.palette.secondary.main }}>
        <Typography variant="h4">{containerName}</Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0.5} margin={0.5}>
          <Grid size={{ xs: 6, md: 2 }}>
            <CardService title="Container"/>
          </Grid>
          <Grid size={{ xs: 6, md: 2 }}>
            <CardService title="Endpoint API"/>
          </Grid>
          <Grid size={{ xs: 6, md: 2 }}>
            <CardService title="User capacity"/>
          </Grid>
          <Grid size={{ xs: 6, md: 2 }}>
            <CardService title="CPU"/>
          </Grid>
          <Grid size={{ xs: 6, md: 2 }}>
            <CardService title="RAM"/>
          </Grid>
          <Grid size={{ xs: 6, md: 2 }}>
            <CardService title="Network"/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContainerInfo;