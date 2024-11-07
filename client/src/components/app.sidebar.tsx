'use client'

import styled from '@emotion/styled';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, Collapse } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import Link from "next/link";
import React, { ReactNode } from 'react';

const CustomListItem = ({ href, title, onClick, children }: { href: string; title: string; onClick: () => void, children: ReactNode }) => {
    const theme = useTheme();
    return (
        <ListItemButton
            sx={{
                '&:hover': {
                    '& .MuiListItemText-primary': {
                        color: theme.palette.primary.main,
                    },
                },
            }}
            onClick={onClick}
            component={Link}
            href={href}
        >
            <ListItemText
                primary={title}
                primaryTypographyProps={{
                    sx: {
                        color: 'white',
                        fontSize: '22px',
                        fontWeight: 'normal',
                        alignContent: 'center',
                        marginLeft: '2rem'
                    },
                }}
            />
            {children}
        </ListItemButton>
    );
};

const CollapseItemStyle = {
    color: 'white',
    fontSize: '22px',
    fontWeight: 'normal',
    alignContent: 'center',
    pl: '4rem',
}

const SidebarList = () => {
    const theme = useTheme();

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List>
        <CustomListItem href='/dashboard' title='Dashboard'>
        </CustomListItem>
        <CustomListItem href='/' title='Services' onClick={handleClick}>
        {open ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}

        </CustomListItem> 
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton
                sx={{
                    ...CollapseItemStyle,
                    '&:hover': {
                        '& .MuiListItemText-primary': {
                            color: theme.palette.primary.main,
                        },
                    },
                }}
                href='/exchange-rate-service'
            >
                <ListItemText primary="Exchange rate service" />
            </ListItemButton>
            <ListItemButton
                sx={{
                    ...CollapseItemStyle,
                    '&:hover': {
                        '& .MuiListItemText-primary': {
                            color: theme.palette.primary.main,
                        },
                    },
                }}
                href='/gold-price-service'
            >
                <ListItemText primary="Gold price service" />
            </ListItemButton>
            </List>
        </Collapse>
    </List>
);

    
}


const AppSideBar = () => {
    const theme = useTheme();

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    backgroundColor: theme.palette.background.default,
                },
            }}
        >
            <Box sx={{ width: 360 }} role="presentation">
                <Typography variant="h6" sx={{
                    padding: 2, fontSize: '33px', fontWeight: 'bold', color: 'white'
                }}>
                    Monitoring Service
                </Typography>
                <Divider />
                <SidebarList/>
            </Box>
        </Drawer >
    );
}
export default AppSideBar;
