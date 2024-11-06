"use client"
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3bd671',
        },
        secondary: {
            main: '#8ABFA3',
        },
        background: {
            default: '#11151C',
            paper: '#1A1D25',
        },
    },
    direction: 'rtl',
    spacing: 8,
    shape: {
        borderRadius: 4,
    },
    overrides: {
        MuiAppBar: {
            colorInherit: {
                backgroundColor: '#689f38',
                color: '#fff',
            },
        },
    },
});

export default theme;
