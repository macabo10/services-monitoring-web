'use client'

import { createTheme } from '@mui/material/styles';

// add new custom property to background
declare module '@mui/material/styles' {
    interface TypeBackground {
        main: string;
        card: string;
    }
}

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3bd671',
        },
        secondary: {
            main: '#ced4d7',
        },
        background: {
            default: '#15222b',
            main: '#131925',
            card: '#1d2434',
        },
    },
    direction: 'rtl',
    spacing: 8,
    shape: {
        borderRadius: 4,
    },
});

export default theme;
