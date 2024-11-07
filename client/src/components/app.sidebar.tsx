'use client'

import styled from '@emotion/styled';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, FormControl, Select, MenuItem, InputLabel, SelectChangeEvent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';

import Link from "next/link";
import React from 'react';

const AppSideBar = () => {
    const [service, setService] = React.useState('');

    const handleServiceChange = (event: SelectChangeEvent) => {
        console.log(event.target.value);
        setService(event.target.value);
        
    };
    
    const theme = useTheme();
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                '& .MuiDrawer-paper': {
                    // width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: theme.palette.background.default,
                },
            }}
        >
            <Box sx={{ width: 360 }} role="presentation">
                <Typography variant="h6" sx={{
                    padding: 2, fontSize: '33px', fontWeight: 'bold', color: 'white'
                }}>
                    MonitoringService
                </Typography>
                <Divider />
                <List>
                    <ListItemButton component={Link}
                        href="/dashboard"
                        sx={{
                            '&:hover': {
                                '& .MuiListItemText-primary': {
                                    color: theme.palette.primary.main,
                                },
                            },
                        }}
                    >
                        <ListItemIcon>
                            {/* <DashboardIcon /> */}
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"
                            primaryTypographyProps={{ sx: { color: 'white', fontSize: '22px', fontWeight: 'normal',  alignContent: 'center'} }}
                        />
                    </ListItemButton>
                    <ListItemButton>
                        <FormControl 
                            fullWidth
                        >
                            <InputLabel id="service-select-label"
                                sx={{
                                    color: 'white',
                                    fontWeight: 'normal',
                                    alignItems: 'center',
                                }}
                            >
                                Services
                            </InputLabel>
                            <Select
                                id="serivce-select"
                                label="Services"
                                value={service}
                                sx={{color: 'white'}}
                                onChange={handleServiceChange}
                            >
                                <MenuItem value={"gold-price-service"} sx={{color: 'white'}}>Gold price service</MenuItem>
                                <MenuItem value={"exchange-rate-service"} sx={{color: 'white'}}>Exchange rate service</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItemButton>
                </List>
            </Box>
        </Drawer >
    );
}
export default AppSideBar;
