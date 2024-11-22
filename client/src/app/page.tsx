import styles from "./page.module.css";
import Header from "../components/Header";
import DashboardGrid from "../components/DashboardGrid";
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';


export default function Dashboard(){
    return(
        <Box>
            <Header content={"DASHBOARD"}/>
            <DashboardGrid/>
        </Box>
    );
}