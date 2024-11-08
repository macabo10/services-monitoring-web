'use client'

import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
  

const card = ({title, content}: {title: string, content?: React.ReactNode}) => {
    const theme = useTheme();
    return (
        <React.Fragment>
            <CardContent sx={{ height: '13vh' }}>
                <Typography variant="h5" component="div" sx={{ color: theme.palette.secondary.main }}>
                    {title}
                </Typography>
                {content}
            </CardContent>
            <CardActions>
                <Button size="small">View detail</Button>
            </CardActions>
        </React.Fragment>
    );
}


const CardService = ({title, children}: {title: string, children?: React.ReactNode}) => {
    const theme = useTheme();
    return (
        <Box>
          <Card variant="outlined" sx={{backgroundColor: theme.palette.background.card}}>
            {card({title, content: children})}
        </Card>
        </Box>
    );
}

export default CardService;