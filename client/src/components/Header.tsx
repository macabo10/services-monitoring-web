'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Header = ( {content}: {content: string} ) => {
    const theme = useTheme();
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" sx={{ backgroundColor: theme.palette.background.main }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant="h6" component="div" 
                    sx={{ color: theme.palette.secondary.main, textAlign: 'center', flexGrow: 1, fontWeight: 'bold', fontSize: 30 }}>
                        {content}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;