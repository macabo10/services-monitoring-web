import React from 'react';
import { Card, CardContent, Typography, Grid, Box, CardActionArea } from '@mui/material';

type Metric = {
  title: string;
  value: string;
};

type Container = {
  title: string;
  metrics: Metric[];
};

type DashboardCardProps = {
  siteName: string;
  containers: Container[];
  path: string;
};
const DashboardCard: React.FC<DashboardCardProps> = ({ siteName, containers, path }) => {
    return (
      <Card sx={{ margin: 2, padding: 2, height: 'auto', width: 'auto', backgroundColor: '#15222b', border: '1px solid #e0e0e0',
        borderRadius: 2,}}>
          <CardContent>
            {/* Dashboard Header */}
            <CardActionArea href={path}>
            <Typography variant="h6" sx={{ margin: 1, color: 'white', }}>
              {siteName}
            </Typography>
            </CardActionArea>
  
            {/* Container Grid */}
            <Grid container direction="column" spacing={2}>
              {containers.map((container, containerIndex) => (
                <Grid item key={containerIndex}>
                  {/* Each Container Card */}
                  <Card sx={{ margin: 2, padding: 2, backgroundColor: '#131925', border: '1px solid #e0e0e0',
                                borderRadius: 2, }}>
                    <CardContent>
                      {/* Container Title */}
                      <Typography variant="subtitle1" sx={{ marginBottom: 1, color: 'white' }}>
                        {container.title}
                      </Typography>
  
                      {/* Metric Grid inside Container */}
                      <Grid container spacing={2}>
                        {container.metrics.map((metric, metricIndex) => (
                          <Grid item xs={12} sm={6} md={4} key={metricIndex}>
                            {/* Metric Box */}
                            <Box
                              sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: 2,
                                padding: 2,
                                backgroundColor: '#1d2434',
                              }}
                            >
                              <Typography variant="body2" color='white'>
                                {metric.title}
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 'bold', marginY: 1, color: 'white' }}>
                                {metric.value}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
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
