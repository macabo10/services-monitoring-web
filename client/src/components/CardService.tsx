'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Collapse, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface CardServiceProps {
  title: string;
  children?: React.ReactNode;
  onFetchDetail: () => Promise<React.ReactNode>;
}

const CardService: React.FC<CardServiceProps> = ({ title, children, onFetchDetail }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [detailContent, setDetailContent] = useState<React.ReactNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExpandClick = async () => {
    if (!expanded && !detailContent) {
      setIsLoading(true);
      try {
        const content = await onFetchDetail();
        setDetailContent(content);
      } catch (error) {
        console.error('Error fetching detail:', error);
        setDetailContent(<Typography color="error">Error loading details</Typography>);
      } finally {
        setIsLoading(false);
      }
    }
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ 
      backgroundColor: theme.palette.background.card,
      transition: 'all 0.3s ease-in-out',
      gridColumn: expanded ? '1 / -1' : 'auto',
      width: expanded ? '100%' : 'auto',
      marginLeft: '5px'
    }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ color: theme.palette.secondary.main }}>
          {title}
        </Typography>
        {children}
      </CardContent>
      <CardActions>
        <Button 
          onClick={handleExpandClick}
          disabled={isLoading}
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          fullWidth
        >
          {isLoading ? 'Loading...' : (expanded ? 'Hide Details' : 'View Details')}
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
            {detailContent}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardService;