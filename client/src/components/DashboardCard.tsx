import React from 'react';
import { Card, CardContent, Typography, Grid, Box, CardActionArea } from '@mui/material';
import { MonitoringInfo } from "@/components/ContainerInfo";
import { useTheme } from '@mui/material/styles';

const InfoBox = ({ title, value }: { title: string; value: string }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          padding: 2,
          backgroundColor: theme.palette.background.card,
        }}
      >
        <Typography variant="body2" color={theme.palette.secondary.main}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginY: 1, color: theme.palette.secondary.main }}>
          {value}
        </Typography>
      </Box>
    </Grid>
  )
}

const DashboardCard = ({ siteName, containers, path }: {siteName: string, containers: MonitoringInfo[], path: string}) => {
  const theme = useTheme();
    return (
      <Card sx={{ margin: 2, padding: 2, height: 'auto', width: 'auto', backgroundColor: theme.palette.background.default, border: '1px solid #e0e0e0',
        borderRadius: 2,}}>
          <CardContent>
            {/* Dashboard Header */}
            <CardActionArea href={path}>
            <Typography variant="h6" sx={{ margin: 1, color: theme.palette.secondary.main}}>
              {siteName}
            </Typography>
            </CardActionArea>
  
            {/* Container Grid */}
            <Grid container direction="column" spacing={2}>
              {containers.map((container, containerIndex) => (
                <Grid item key={containerIndex}>
                  {/* Each Container Card */}
                  <Card sx={{ margin: 2, padding: 2, backgroundColor: theme.palette.background.main, border: '1px solid #e0e0e0',
                                borderRadius: 2, }}>
                    <CardContent>
                      {/* Container Title */}
                      <Typography variant="subtitle1" sx={{ marginBottom: 3, color: theme.palette.secondary.main }}>
                        {container.containerID.id}
                      </Typography>
  
                      {/* Metric Grid inside Container */}
                      <Grid container spacing={2}>
                        <InfoBox title="Container Status" value={container.container.status ? 'Running' : 'Stopped'} />
                        <InfoBox title="CPU" value={container.cpu.usage.toString() + "%"} />
                        <InfoBox title="User Capacity" value={"IN: " + (container.userCapacity?.in?.toString() || 'N/A') + ", OUT:" + (container.userCapacity?.out?.toString() || 'N/A')} />
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
      </Card>
    );
  };
  

export default DashboardCard;
