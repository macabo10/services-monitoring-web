'use client'

import CardDashboard from '@/components/card.dashboard';
import { useTheme } from '@mui/material/styles';

const DashboardPage = () => {
    const theme = useTheme();

    return (
        <>
            <CardDashboard title="Total Users" value="100" color={theme.palette.background.card} />
        </>

    );
}

export default DashboardPage;