'use client'

import styled from '@emotion/styled';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';

import Link from "next/link";

const AppSideBar = () => {
    const theme = useTheme();
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 360,
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
                            primaryTypographyProps={{ sx: { color: 'white', fontSize: '22px', fontWeight: 'normal' } }}
                        />
                    </ListItemButton>
                    <ListItemButton component={Link} href="/detail"
                        sx={{
                            '&:hover': {
                                '& .MuiListItemText-primary': {
                                    color: theme.palette.primary.main,
                                },
                            },
                            padding: '8px 16px', // Adjust padding to make the button smaller
                        }}
                    >
                        <ListItemIcon>
                            {/* <DashboardIcon /> */}
                        </ListItemIcon>
                        <ListItemText primary="Detail"
                            primaryTypographyProps={{ sx: { color: 'white', fontSize: '22px', fontWeight: 'normal' } }}
                        />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer >
    );
}
export default AppSideBar;
